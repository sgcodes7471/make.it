import { WebContainer } from '@webcontainer/api';
import { useEffect, useState } from 'react';

interface PreviewFrameProps {
  files? : any[],
  webContainer: WebContainer | undefined,
  url : string,
  setUrl : React.Dispatch<React.SetStateAction<string>>;
}

export function PreviewFrame({ webContainer , url, setUrl }: PreviewFrameProps) {
  // In a real implementation, this would compile and render the preview
  // const [url, setUrl] = useState("");
  async function main() {
    if(webContainer === undefined) return
    const installProcess = await webContainer.spawn('npm', ['install']);

    const installExitCode = await installProcess.exit;
        
    if (installExitCode !== 0) {
      console.log("Installation failed");
      return
    }

    console.log('Dependencies installed successfully');

    await webContainer.spawn('npm', ['run', 'dev']);

    // Wait for `server-ready` event
    webContainer.on('server-ready', (port, url) => {
      // ...
      console.log(url)
      console.log(port)
      setUrl(url);
    });
  }

  useEffect(() => {
    if(url.length == 0) 
      main()
  }, [])
  return (
    <div className="h-full flex items-center justify-center text-gray-400">
      {!url && <div className="text-center">
        <p className="mb-2">Loading...</p>
      </div>}
      {url && <iframe width={"100%"} height={"100%"} src={url} />}
    </div>
  );
}