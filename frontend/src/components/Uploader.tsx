import React from "react";
import { uploadFile } from "../api";

export default function Uploader({onLoaded}:{onLoaded:(payload:any)=>void}){
  const [loading,setLoading] = React.useState(false);
  const [err,setErr] = React.useState<string>("");
  const [fileName,setFileName] = React.useState("");

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>)=>{
    const f = e.target.files?.[0];
    if(!f) return;
    setErr(""); setLoading(true); setFileName(f.name);
    try{
      const data = await uploadFile(f);
      onLoaded(data);
    }catch(ex:any){
      setErr(ex.message || "Upload failed");
    }finally{
      setLoading(false);
    }
  };

  return (
    <div>
      <label className="btn" htmlFor="file-input">Choose document</label>
      <input id="file-input" type="file" accept=".pdf,.docx,.txt" onChange={onChange} style={{display:"none"}} />
      {fileName && <span className="muted" style={{marginLeft:12}}>{fileName}</span>}
      {loading && <p className="muted">Extracting…</p>}
      {err && <p style={{color:"#ff8a8a"}}>{err}</p>}
    </div>
  );
}
