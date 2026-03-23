"use client"

// import { auth } from "@/auth";
import { useEffect, useState } from "react";

interface RepoFormProps {
  onClose: () => void; 
}

export default function GithubForm({
  onClose,
}: RepoFormProps) {

    const [repo, setRepo] = useState<string>("");
    const [username , setUsername] = useState<string>("");
    const [email , setEmail] = useState<string>("");
    const [description , setDescription] = useState<string>("");
    const [token, setToken] = useState<string>("");

    // const session = await auth();

    // useEffect(() => {
    //   console.log(session)
    // }, [session])

    async function handleRepoCreation() {
      try {
        const res = await fetch("/api/github/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            form: { repo, description, token }
          })
        }); 
        const response = await res.json();
        
        console.log(response)
        if(!response.success) {
          throw new Error(`Could not create a repo\n${response.error}`);
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }


    async function handleSubmit() {
      const repoCreateStatus = await handleRepoCreation();
      if(repoCreateStatus) return;
      onClose()
    }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 z-50">
      <div className="w-full max-w-md bg-neutral-950 rounded-xl border border-neutral-800 shadow-xl p-6">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-neutral-100">Create GitHub Repository</h2>
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-neutral-300 transition cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="text-neutral-300 text-sm">GitHub Username</label>
            <input
              value={repo}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your GitHub username..."
              className="mt-1 w-full bg-black border border-neutral-800 text-neutral-200 p-3 rounded-lg focus:ring-2 focus:ring-neutral-600 focus:border-transparent"
            />
          </div>

          <div>
            <label className="text-neutral-300 text-sm">GitHub Registered Email</label>
            <input
              value={repo}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your GitHub email..."
              className="mt-1 w-full bg-black border border-neutral-800 text-neutral-200 p-3 rounded-lg focus:ring-2 focus:ring-neutral-600 focus:border-transparent"
            />
          </div>

          <div>
            <label className="text-neutral-300 text-sm">Repository Name</label>
            <input
              value={repo}
              onChange={(e) => setRepo(e.target.value)}
              placeholder="Enter repository name..."
              className="mt-1 w-full bg-black border border-neutral-800 text-neutral-200 p-3 rounded-lg focus:ring-2 focus:ring-neutral-600 focus:border-transparent"
            />
          </div>

          <div>
            <label className="text-neutral-300 text-sm">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description..."
              className="mt-1 w-full bg-black border border-neutral-800 text-neutral-200 p-3 rounded-lg h-20 resize-none focus:ring-2 focus:ring-neutral-600 focus:border-transparent"
            />
          </div>

          <div>
            <label className="text-neutral-300 text-sm">GitHub Fine Grained Token</label>
            <input
              value={token}
              onChange={(e) => setToken(e.target.value)}
              type="password"
              placeholder="Paste your GitHub token..."
              className="mt-1 w-full bg-black border border-neutral-800 text-neutral-200 p-3 rounded-lg focus:ring-2 focus:ring-neutral-600 focus:border-transparent"
            />
            <p className="text-xs text-neutral-500 mt-1">
              Don’t have a token?{" "}
              <a
                href=""
                className="text-neutral-300 underline hover:text-neutral-100"
              >
                Learn how to generate one
              </a>
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-6 gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-neutral-800 text-neutral-300 hover:bg-neutral-700 transition cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-neutral-100 text-black font-medium hover:bg-neutral-200 transition cursor-pointer"
          >
            Create Repository
          </button>
        </div>
      </div>
    </div>
  );
}
