import React from "react";
import Uploader from "./components/Uploader";
import ClauseView from "./components/ClauseView";
import { analyze, ping, API } from "./api";
import QA from "./components/QA";

export default function App(){
  const [text,setText] = React.useState("");
  const [sections,setSections] = React.useState<[string,string][]>([]);
  const [summary,setSummary] = React.useState("");
  const [risks,setRisks] = React.useState<[string,number][]>([]);
  const [status,setStatus] = React.useState<string>("");
  const [busy,setBusy] = React.useState(false);

  React.useEffect(()=>{
    (async()=>{
      try{
        await ping();
        setStatus(`Connected to API: ${API}`);
      }catch(ex:any){
        setStatus(ex?.message || "API unreachable");
      }
    })();
  },[]);

  const onLoaded = (payload:any)=>{
    setText(payload.text || "");
    setSections(payload.sections || []);
    setRisks(payload.risks || []);
  };

  const summarize = async ()=>{
    setBusy(true);
    try{
      const {result} = await analyze("summarize", text);
      setSummary(result || "");
    } finally { setBusy(false); }
  };

  return (
    <div className="app-shell">
      <div className="card" style={{marginBottom:16}}>
        <h2 className="title">NyaySaathi: Local Legal Assistant</h2>
        <p className="muted">{status}</p>
        <p className="muted">Disclaimer: Not legal advice; verify with a professional.</p>
        <Uploader onLoaded={onLoaded}/>
      </div>
      {text && (
        <div className="card" style={{marginBottom:16}}>
          <button className="btn btn-accent" onClick={summarize} disabled={busy}>Summarize</button>
          <h3 className="title">Summary</h3>
          <pre>{summary}</pre>

          <h3 className="title">Risk highlights</h3>
          <ul className="list">
            {risks.map(([kw,idx],i)=>(<li key={i}><span className="chip">{kw}</span> at {idx}</li>))}
          </ul>

          <details>
            <summary>Full Text</summary>
            <pre>{text}</pre>
          </details>
        </div>
      )}
      {text && (
        <div className="row">
          <div className="card">
            <ClauseView sections={sections}/>
          </div>
          <div className="card">
            <h3 className="title">Interactive Q&A</h3>
            <QA docText={text}/>
          </div>
        </div>
      )}
    </div>
  );
}
