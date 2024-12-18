// src/server.js
// import { createServer } from 'miragejs';

const { createServer } = require("miragejs");

export function makeServer() {
  const server = createServer({
    routes() {
      this.namespace = "api";
  
      this.post("/execute", (schema, request) => {
        const { language, code } = JSON.parse(request.requestBody);
  
        let output = "";
        let error = "";
  
        try {
          if (language === "python") {
            // Simulate Python 'print("text")'
            const match = code.trim().match(/^print\(["'](.+?)["']\)$/);
            if (match) {
              output = match[1]; // Extract the content inside print()
            } else {
              throw new Error("SyntaxError: Unexpected token in Python code");
            }
          } else if (language === "go") {
            // Simulate Go 'fmt.Println("text")'
            const match = code.trim().match(/^fmt.Println\(["'](.+?)["']\)$/);
            if (match) {
              output = match[1]; // Extract the content inside fmt.Println()
            } else {
              throw new Error("SyntaxError: Unexpected token in Go code");
            }
          } else {
            throw new Error("Unsupported language");
          }
        } catch (e) {
          error = e.message;
        }
  
        return { status: error ? "error" : "success", error, output };
      });
    },
  });

  return server;
}
