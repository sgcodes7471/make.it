"use client"
import { Code2, Eye, FolderDown, Github } from 'lucide-react';
import axios from 'axios';
import { useState } from 'react';
import GithubForm from './GithubForm';
import { FileItem } from '@/types';

interface TabViewProps {
  activeTab: 'code' | 'preview';
  onTabChange: (tab: 'code' | 'preview') => void;
  // downloadZIP : () => void
  files : FileItem[]
}

export function TabView({ activeTab, onTabChange , files }: TabViewProps) {
  const [openGithubForm , setOpenGithubForm] = useState<boolean>(false);

  async function downloadZIP() {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/download-zip` , {
          files 
        }, {
          responseType : "blob"
        });
    
        const blob = new Blob([response.data] , {type : "application/zip"});
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "project.zip";
        a.click();
        
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.log("Error at download zip : \n" , error);
      }
  }

  function closeGithubForm() {
    setOpenGithubForm(false);
  }

  return (
    <>
    {
      openGithubForm && 
      <GithubForm onClose = {closeGithubForm}/>
    }
    <div className="flex space-x-2 mb-4">
      <button
        onClick={() => onTabChange('code')}
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors cursor-pointer ${
          activeTab === 'code'
            ? 'bg-gray-700 text-gray-100'
            : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
        }`}>
        <Code2 className="w-4 h-4" />
        Code
      </button>
      <button
          onClick={() => onTabChange('preview')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors cursor-pointer ${
            activeTab === 'preview'
              ? 'bg-gray-700 text-gray-100'
              : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
          }`}>
        <Eye className="w-4 h-4" />
        Preview
      </button>

      <button
          onClick={() => setOpenGithubForm(true)}
          className={`flex items-center gap-2 px-4 py-2 rounded-md cursor-pointer transition-colors text-gray-400 hover:text-gray-200 hover:bg-gray-800`}>
        <Github className="w-4 h-4" />
        Push to GitHub
      </button>

      <button
          onClick={downloadZIP}
          className={`flex items-center gap-2 px-4 py-2 rounded-md cursor-pointer transition-colors text-gray-400 hover:text-gray-200 hover:bg-gray-800`}>
        <FolderDown className="w-4 h-4" />
        Download
      </button>
    </div>
    </>
  );
}