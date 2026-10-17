import React, { useState, useEffect } from "react";
import DemoPDF from "./DemoPDF";

const Demo = () => {
  const [runFunctionFromParent, setRunFunctionFromParent] = useState(false);

  return (
    <>
      <div className="p-5">
        <h1>https://react-pdf.org/</h1>
      </div>

      <div className="hidde-n ps-5">
        <DemoPDF
          runFunctionFromParent={runFunctionFromParent}
          setRunFunctionFromParent={setRunFunctionFromParent}
        />
      </div>
    </>
  );
};

export default Demo;
