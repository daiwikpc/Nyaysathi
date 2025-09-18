import React from "react";
import { analyze } from "../api";

export default function QA({docText}:{docText:string}){
  const [q,setQ] = React.useState("");
  const [a,setA] = React.useState("");
  const [busy,setBusy] = React.useState(false);
  const [err,setErr] = React.useState("");

  const ask = async ()=>{
    setBusy(true); setErr("");
    try{
      const {result} = await analyze("qa", docText, q);
      setA(result || "");
    }catch(ex:any){
      setErr(ex?.message || "Failed to get answer");
    }finally{ setBusy(false); }
  };

  return (
    <div>
      <input className="input" value={q} onChange={e=>setQ(e.target.value)} placeholder="Ask a question about this contract" />
      <div style={{height:8}}/>
      <button className="btn btn-accent" onClick={ask} disabled={busy || !q.trim()}>Ask</button>
      {err && <p style={{color:"#ff8a8a"}}>{err}</p>}
      <pre>{a}</pre>
    </div>
  );
}
