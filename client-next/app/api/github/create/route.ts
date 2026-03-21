import { NextRequest, NextResponse } from "next/server"
import { Octokit } from "octokit";

interface GithubPushForm {
  repo : string;
  description : string;
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
            auth: form.token
        })
        
        const response = await octokit.request('POST /user/repos', {
            name: form.repo,
            description: form.description,
            homepage: 'https://github.com',
            'private': false,
            is_template: true,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })
    
        if(response.status != 201) {
            console.log("Not able to create a repository\n" , response);
            throw new Error("Not able to create a repository");
        }
    
        return NextResponse.json({success : true});
    } catch (error) {
        console.log(error)
        return NextResponse.json({success : false});
    }
}