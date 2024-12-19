import React, { useState } from "react";
import Editor from "@monaco-editor/react";

function App() {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleRunCode = () => {
    setOutput("Running...");
  
    console.log("Running code...");
  
    // Simulate sending code to server for execution
    fetch("http://localhost:3000/api/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: language, // Python or Go
        code: code.trim(),   // Code written by the user
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Server response:", data);

        // If there is an error in code execution
        if (data.status === "error") {
          setOutput(`Error: ${data.error}`);
        } else {
          // Display successful output from the code execution
          setOutput(code.trim());
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setOutput(`Error: ${error.message}`);
      });
  };
   
  return (
        <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      {/* Task Description */}
      <div className="mb-6 text-center max-w-3xl bg-white shadow p-4 rounded w-full">
        <h1 className="text-2xl font-bold mb-2">Online Code Editor</h1>
        <p className="text-gray-700">
          Write code in Python or Go, then run it to see the results!
        </p>
      </div>

      {/* Code Editor */}
        <div className="w-full max-w-4xl">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-2 gap-2">
            {/* Language Selector */}
            <select
              className="border border-gray-300 p-2 rounded w-full sm:w-auto"
              value={language}
              onChange={handleLanguageChange}
            >
              <option value="python">Python</option>
              <option value="go">Go</option>
            </select>

            {/* Run Button */}
            <button
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full sm:w-auto"
              onClick={handleRunCode}
            >
              Run
            </button>
          </div>

          <Editor
            height="400px"
            language={language}
            value={code}
            theme="vs-dark"
            onChange={(value) => setCode(value || "")}
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              automaticLayout: true,
            }}
          />
        </div>

        {/* Output Block */}
        <div className="mt-4 w-full max-w-4xl bg-white shadow p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">Output</h2>
          <pre className="bg-gray-100 p-2 rounded text-sm">{output}</pre>
        </div>
      </div>
  );
}

export default App;
