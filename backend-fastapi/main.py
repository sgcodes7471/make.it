from typing import Union, List, Optional, Literal
from fastapi import FastAPI
from pydantic import BaseModel
import asyncio
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from fastapi.responses import FileResponse
from pathlib import Path
import shutil
import os
import logging
import time

from prompts import react_base_prompt
from prompts import node_base_prompt
from prompts import next_base_prompt
from prompts import base_prompt
from prompts import get_system_prompt

from openai import OpenAI
from google import genai
from google.genai import types

from test import test_file_struct

load_dotenv()

template_client = genai.Client(api_key = os.getenv("GEMINI_API_KEY"))
chat_client = OpenAI(
    api_key = os.getenv("GEMINI_API_KEY"),
    base_url = "https://generativelanguage.googleapis.com/v1beta/openai/"
)

logging.basicConfig(filename = "logs.log", level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

app = FastAPI()

app.add_middleware(
    CORSMiddleware , 
    allow_origins = ["*"] , 
    allow_credentials = True , 
    allow_methods = ["*"],
    allow_headers = ["*"]
)


class template_body(BaseModel) :
    query : str

@app.post("/template")
async def get_template(body : template_body):
    try :
        response = template_client.models.generate_content(
            model = "gemini-2.5-flash",
            config = types.GenerateContentConfig(
                system_instruction = "Return either node or react or next based on what do you think this project should be, keeping in mind not to add any extra overhead. Only return a single word either 'node' or 'react' or  'next'. Do not return anything extra. Here node refers to the runtime environment of Javascript, react is React.js and next is Next.js."
            ),
            contents = body.query
        )
        answer = response.text
        print(answer)
        if(answer == "react") :
            return {
                "success" : True,
                "prompts" : [base_prompt , f"Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${react_base_prompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n"] ,
                "ui_prompts" : [react_base_prompt]
            }
        
        if(answer == "node") :
            return {
                "success" : True,
                "prompts" : ["" , f"Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${node_base_prompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n"]  ,
                "ui_prompts" : [node_base_prompt]
            }
        
        if(answer == "next") :
            return {
                "success" : True , 
                "prompts" : [base_prompt , f"Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${next_base_prompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n"],
                "ui_prompts" : [next_base_prompt]
            }
        
        return {"success" : False , "message" : "Not able to access this"} 
    except Exception as e :
        logger.error(f"Error in /template : {e}")
        return {"success" : False , "error" : e}



class chat_body(BaseModel) :
    base_prompt : str 
    template_prompt : str
    user_prompt : str

@app.post("/chat") 
async def chat_llm(body : chat_body) :
    try :
        response = chat_client.chat.completions.create(
            model = "gemini-2.5-flash",
            messages = [
                {
                    "role" : "system",
                    "content" : get_system_prompt()
                } ,
                {
                    "role" : "user" ,
                    "content" : body.base_prompt
                } , 
                {
                    "role" : "user" , 
                    "content" : body.template_prompt
                } , 
                {
                    "role" : "user" ,
                    "content" : body.user_prompt
                }
            ], 
            # stream = True
        )
        # for chunk in response : 
        #     print(chunk.choice[0].delta)

        return {
            "success" : True ,
            "code" : response.choices[0].message 
        }
    except Exception as e:
        logger.error(f"Error in /template : {e}")
        return {"success" : False , "error" : e}


class file_item(BaseModel) :
    name : str
    type : str
    children : Optional[List["file_item"]] = None
    content : Optional[str] = "",
    path : str

file_item.model_rebuild()

class download_zip_body(BaseModel) :
    files : List[file_item]

def create_structure(base: Path, item: file_item):
    target = base / item.name
    if item.type == "folder":
        target.mkdir(parents=True, exist_ok=True)
        if item.children:
            for child in item.children:
                create_structure(target, child)
    else:
        target.parent.mkdir(parents=True, exist_ok=True)
        with open(target, "w", encoding="utf-8") as f:
            f.write(item.content or "")

@app.post('/download-zip')
def download_zip(body : download_zip_body):
    try:
        files = body.files
        # clear zips folder
        zips_dir = Path("zips")
        if zips_dir.exists():
            shutil.rmtree(zips_dir)
        zips_dir.mkdir(parents=True, exist_ok=True)
        
        # create project folder
        project_dir = Path(f"Project-{int(time.time())}")
        project_dir.mkdir(parents=True, exist_ok=True)
        
        # build structure
        for item in files:
            create_structure(project_dir, item)
        
        # make zip
        zip_path = zips_dir / "project"
        shutil.make_archive(str(zip_path), "zip", root_dir=str(project_dir))

        shutil.rmtree(project_dir)

        return FileResponse(
            str(zip_path) + ".zip",
            media_type="application/zip",
            filename="project.zip"
        )

    except RuntimeError as e :
        logger.error(f"Runtime Error in /download-zip : {e}")
        return {"success" : False , "error" : str(e)}

    except Exception as e:
        logger.error(f"Error in /download-zip : {e}")
        return {"success": False, "error": str(e)}
    


if __name__ == "__main__":
    uvicorn.run("make.it:app", host = "127.0.0.1", port = 8000, reload = True)
    # files = [file_item(**p) for p in test_file_struct]
    # body = download_zip_body(files = files)
    # response = download_zip(body)
    

