import React, { useState } from "react";
import { Copy, Check, FileCode, Folder, Database, Terminal, FileText, Download, Code } from "lucide-react";

interface CodeExporterTabProps {
  exportedFiles: Record<string, string> | null;
}

export default function CodeExporterTab({ exportedFiles }: CodeExporterTabProps) {
  const [activeFile, setActiveFile] = useState<string>("app.py");
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  if (!exportedFiles) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-zinc-400" id="code-exporter-loading">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E50914] mb-4" />
        <p className="font-mono text-xs">Loading Python & Streamlit Code Workspace templates...</p>
      </div>
    );
  }

  const handleCopy = (fileName: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedStates(prev => ({ ...prev, [fileName]: true }));
    setTimeout(() => {
      setCopiedStates(prev => ({ ...prev, [fileName]: false }));
    }, 2000);
  };

  const fileDescriptions: Record<string, string> = {
    "app.py": "Main interactive web frontend written using Streamlit. Loads the pickle serialized objects to generate dynamic UI recommendations.",
    "model_generator.py": "Machine learning training and pre-processing pipeline. Combines variables text features, fits Scikit-Learn TfidfVectorizer, computes similarities, and exports Pickle files.",
    "notebooks/EDA.ipynb": "A clean Exploratory Data Analysis Jupyter Notebook script. Includes data cleaning, duplicates purges, and Matplotlib/Seaborn visual histograms.",
    "requirements.txt": "Listing of required Python pip dependencies. Crucial for Streamlit cloud deployments.",
    "README.md": "Standard portfolio documentation including quickstarts, structure layout, and instructions for Streamlit & GitHub deployment."
  };

  const getFileIcon = (name: string) => {
    if (name.endsWith(".py") || name.endsWith(".ipynb")) {
      return <FileCode className="text-amber-500" size={14} />;
    }
    if (name.endsWith(".txt")) {
      return <Code className="text-emerald-450" size={14} />;
    }
    return <FileText className="text-zinc-400" size={14} />;
  };

  // Helper to trigger file downloads
  const handleDownloadFile = (name: string, content: string) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const cleanName = name.replace(/\//g, "_");
    a.href = url;
    a.download = cleanName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 animate-fade-in" id="code-exporter-container">
      
      {/* File Explorer Pane */}
      <div className="lg:col-span-1 bg-[#181818] border border-zinc-800 rounded-lg p-5 space-y-4">
        <h3 className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
          <Terminal size={14} className="text-zinc-500" />
          Project Repository Filetree
        </h3>

        <div className="space-y-1">
          {/* Folder */}
          <div className="flex items-center space-x-2 text-zinc-300 font-mono text-xs py-1">
            <Folder className="text-[#E50914] fill-[#E50914]/10" size={16} />
            <span className="font-semibold text-white">Movie-Recommendation-System/</span>
          </div>

          <div className="pl-4 space-y-1 border-l border-zinc-800 ml-2">
            
            {/* Folder: data/ */}
            <div className="flex items-center space-x-2 text-zinc-400 font-mono text-xs py-1">
              <Folder className="text-zinc-650" size={14} />
              <span>data/</span>
            </div>
            <div className="pl-4 border-l border-zinc-805 ml-2 space-y-1 font-mono text-[11px] text-zinc-500">
              <div className="flex items-center space-x-1.5 py-0.5">
                <Database size={10} />
                <span>movies.csv <span className="text-[9px] text-zinc-600">(9742 rows)</span></span>
              </div>
              <div className="flex items-center space-x-1.5 py-0.5">
                <Database size={10} />
                <span>ratings.csv <span className="text-[9px] text-zinc-600">(100836 logs)</span></span>
              </div>
            </div>

            {/* Folder: notebooks/ */}
            <div className="flex items-center space-x-2 text-zinc-400 font-mono text-xs py-1">
              <Folder className="text-zinc-650" size={14} />
              <span>notebooks/</span>
            </div>
            <div className="pl-4 border-l border-zinc-805 ml-2 space-y-1">
              <button 
                onClick={() => setActiveFile("notebooks/EDA.ipynb")}
                className={`w-full flex items-center space-x-2 py-1 px-2 rounded text-left font-mono text-xs transition-all ${activeFile === "notebooks/EDA.ipynb" ? "bg-zinc-900 border border-zinc-800 text-[#E50914]" : "text-zinc-400 hover:bg-zinc-900/40 border border-transparent"}`}
              >
                {getFileIcon("notebooks/EDA.ipynb")}
                <span>EDA.ipynb</span>
              </button>
            </div>

            {/* Folder: model/ */}
            <div className="flex items-center space-x-2 text-zinc-400 font-mono text-xs py-1">
              <Folder className="text-zinc-650" size={14} />
              <span>model/</span>
            </div>
            <div className="pl-4 border-l border-zinc-805 ml-2 space-y-1 font-mono text-[11px] text-zinc-500">
              <div className="flex items-center space-x-1.5 py-0.5">
                <FileText size={10} />
                <span>movie_list.pkl <span className="text-[9.5px] text-zinc-600">(serialized)</span></span>
              </div>
              <div className="flex items-center space-x-1.5 py-0.5">
                <FileText size={10} />
                <span>similarity.pkl <span className="text-[9.5px] text-zinc-600">(weighted matrix)</span></span>
              </div>
            </div>

            {/* Root files */}
            <div className="space-y-1 pt-2">
              {["app.py", "model_generator.py", "requirements.txt", "README.md"].map((name) => (
                <button
                  key={name}
                  onClick={() => setActiveFile(name)}
                  className={`w-full flex items-center space-x-2 py-1 px-2 rounded text-left font-mono text-xs transition-all ${activeFile === name ? "bg-zinc-900 border border-zinc-800 text-[#E50914]" : "text-zinc-400 hover:bg-zinc-900/40 border border-transparent"}`}
                >
                  {getFileIcon(name)}
                  <span>{name}</span>
                </button>
              ))}
            </div>

          </div>
        </div>

        <div className="border-t border-zinc-800 pt-4 text-[11px] space-y-2 text-zinc-400">
          <p className="leading-relaxed">
            💡 Running these files in your local Python terminal reproduces this exact recommendation layout directly via Streamlit!
          </p>
        </div>
      </div>

      {/* Code Viewer Page */}
      <div className="lg:col-span-3 bg-[#181818] border border-zinc-800 rounded-lg overflow-hidden flex flex-col justify-between shadow-md">
        
        {/* Header */}
        <div className="bg-black/40 px-5 py-4 border-b border-zinc-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <FileCode className="text-[#E50914]" size={16} />
              <h4 className="text-xs font-bold font-mono text-white">{activeFile}</h4>
            </div>
            <p className="text-xs text-zinc-400 mt-1 max-w-xl">
              {fileDescriptions[activeFile] || "Raw code asset for machine learning training and hosting."}
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            {/* Copy button */}
            <button
              onClick={() => handleCopy(activeFile, exportedFiles[activeFile])}
              className="inline-flex items-center space-x-1.5 text-xs bg-zinc-900 hover:bg-zinc-800 text-zinc-350 py-1.5 px-3 rounded border border-zinc-800 transition-all font-mono"
            >
              {copiedStates[activeFile] ? (
                <>
                  <Check size={13} className="text-emerald-450 animate-bounce" />
                  <span className="text-emerald-450 font-bold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  <span>Copy raw</span>
                </>
              )}
            </button>

            {/* Individual Download */}
            <button
              onClick={() => handleDownloadFile(activeFile, exportedFiles[activeFile])}
              className="inline-flex items-center space-x-1.5 text-xs bg-[#E50914] hover:bg-[#FF1A26] text-white font-bold py-1.5 px-3 rounded border border-[#E50914]/10 shadow transition-all font-mono tracking-tight"
            >
              <Download size={13} />
              <span>Download file</span>
            </button>
          </div>
        </div>

        {/* Scroll panel */}
        <div className="flex-1 overflow-auto max-h-[500px] p-5 bg-black font-mono text-[11px] text-zinc-300 leading-relaxed border-b border-zinc-850 select-text">
          <pre className="whitespace-pre-wrap select-text">
            <code>
              {exportedFiles[activeFile] ? exportedFiles[activeFile] : "# Loading code files..."}
            </code>
          </pre>
        </div>

        {/* Playbook banner */}
        <div className="bg-black/20 px-6 py-5 space-y-3">
          <h4 className="text-[10px] font-mono uppercase font-bold text-[#E50914] tracking-wider">
            🌍 Deployment Playbook info
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-zinc-400">
            <div className="space-y-1.5">
              <span className="font-semibold text-white font-mono uppercase tracking-wider text-[11px] block">Streamlit Cloud Hosting</span>
              <p className="leading-relaxed text-[11px]">
                1. Push files to a public GitHub repository.<br />
                2. Log into <a href="https://share.streamlit.io" target="_blank" rel="noreferrer" className="text-[#E50914] hover:underline">share.streamlit.io</a>.<br />
                3. Click "New App", choose repo, set branch, and select <code className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-1 py-0.5 rounded font-mono">app.py</code> as the main file entry point.<br />
                4. Done! Your recommendation system is online!
              </p>
            </div>
            <div className="space-y-1.5">
              <span className="font-semibold text-white font-mono uppercase tracking-wider text-[11px] block">Pushing code via Git CLI</span>
              <p className="leading-relaxed font-mono text-[10.5px] bg-[#111111] p-3 rounded border border-zinc-850 overflow-x-auto whitespace-pre">
                git init{"\n"}
                git add .{"\n"}
                git commit -m "feat: movie recommendation framework"{"\n"}
                git branch -M main{"\n"}
                git push -u origin main
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
