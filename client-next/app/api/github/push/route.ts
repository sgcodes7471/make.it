import { FileItem } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "octokit";

interface GithubPushForm {
    owner : string;
    name : string;
    email : string;
    repo : string;
    files : FileItem[];
    token : string;
}


export const POST = async (req : NextRequest) => {
    try {
        const body = await req.json();
        const form : GithubPushForm = body.form;
    
        if(Object.values(form).some((val) => val === undefined || !val)) {
            console.log("Fields missing\n" , form);
            throw new Error("Requried fields missing");
        }
    
        const octokit = new Octokit({
            auth : form.token
        });

        
        async function pushFile(curr : FileItem) {
            if(curr.type === "folder" && curr.children) {
                for(const child of curr.children) {
                    await pushFile(child);
                }
                return;
            }
            const response = await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
                owner : form.owner,
                repo : form.repo,
                path : curr.path,
                message : `Create file ${curr.path}`,
                content : Buffer.from(curr.content || "").toString("base64"),
                committer : {
                    name : form.name, email : form.email
                },
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            })

            if(response.status !== 201) {
                console.log("Not able to push to repository\n" , response);
                throw new Error("Not able to psu to repository");
            }
        };

        for(const file of form.files) {
            await pushFile(file);
        }
    
        return NextResponse.json({"success" : true})
    } catch (error) {
        console.log(error)
        return NextResponse.json({"success" : false})
    }
    
}