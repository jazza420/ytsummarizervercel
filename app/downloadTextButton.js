import React from "react";
import { Button } from "@/components/ui/button";

const DownloadTextFile = () => {
  const handleDownload = () => {
    const text = "This is a sample text file.";
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sample.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return <Button onClick={handleDownload}>Download Text File</Button>;
};

export default DownloadTextFile;
