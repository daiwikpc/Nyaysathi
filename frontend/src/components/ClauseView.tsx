import React from "react";
import { analyze } from "../api";

export default function ClauseView({sections}:{sections:[string,string][]}){
  const [idx,setIdx] = React.useState(0);
  const [result,setResult] = React.useState("");

  const explain = async ()=>{
    const text = sections[idx]?.[1] ?? "";
    const {result} = await analyze("simplify", text);
    setResult(result || "");
  };

  return (
    <div className="row">
      <div>
        <h3 className="title">Sections</h3>
        <ul className="list">
          {sections.map(([title],i)=>(
            <li key={i}>
              <button className="btn" onClick={()=>setIdx(i)}>{title.slice(0,80)}</button>
            </li>
          ))}
        </ul>
        <button className="btn btn-accent" onClick={explain}>Simplify Selected</button>
      </div>
      <div>
        <h3 className="title">Clause Text</h3>
        <pre>{sections[idx]?.[1]}</pre>
        <h3 className="title">Plain-language</h3>
        <pre>{result}</pre>
      </div>
    </div>
  );
}
