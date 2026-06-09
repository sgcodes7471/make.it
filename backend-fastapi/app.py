from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware , 
    allow_origins = [os.getenv("ALLOWED_ORIGINS")] , 
    allow_credentials = True , 
    allow_methods = ["*"],
    allow_headers = ["*"]
)
