/* eslint-disable @typescript-eslint/no-explicit-any */
import { Node } from "@xyflow/react";
import { ExecutorContextType, ExecutorResultType } from "@/types/workflow";
import { replaceVariables } from "@/lib/helper";

export async function executeHttpNode(
  node: Node,
  context: ExecutorContextType
): Promise<ExecutorResultType> {
  const { outputs } = context;
  const {
    method = "GET",
    url = "",
    headers = {},
    body = "",
  } = node.data as any;

  try {
    // Replace variables in URL
    const finalUrl = replaceVariables(url, outputs);

    // Replace variables in headers
    const finalHeaders: Record<string, string> = {};
    Object.entries(headers).forEach(([key, value]) => {
      finalHeaders[key] = replaceVariables(String(value), outputs);
    });

    // Replace variables in body
    let finalBody: string | undefined;
    if (["POST", "PUT", "PATCH", "DELETE"].includes(method) && body) {
      const bodyStr = typeof body === "string" ? body : JSON.stringify(body);
      finalBody = replaceVariables(bodyStr, outputs);
      // Validate JSON if body should be JSON
      try {
        JSON.parse(finalBody);
      } catch {
        throw new Error("Invalid JSON in request body");
      }
    }

    console.log(`HTTP ${method} ${finalUrl}`);

    // Build fetch options
    const fetchOptions: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...finalHeaders,
      },
    };

    if (finalBody) {
      fetchOptions.body = finalBody;
    }

    // Make request
    const response = await fetch(finalUrl, fetchOptions);

    // Get response data
    let responseBody: any;
    const contentType = response.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      responseBody = await response.json();
    } else {
      responseBody = await response.text();
    }

    return {
      output: {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        //headers: responseHeaders,
        body: responseBody,
      },
    };
  } catch (error) {
    console.error("HTTP executor error:", error);
    throw new Error(
      `HTTP request failed: ${error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
// export async function executeHttp(
//   node: Node,
//   context: ExecutorContextType
// ): Promise<ExecutorResultType> {
//   const { outputs } = context;
//   const {
//     method = "GET",
//     url = "",
//     headers = {},
//     body = "",
//   } = node.data as any;

//   try {
//     // Replace variables in URL and body
//     const finalUrl = replaceVariables(url, outputs);
//     let finalBody = body;

//     if (typeof body === "string" && body.trim()) {
//       finalBody = replaceVariables(body, outputs);
//     }

//     // Build fetch options
//     const fetchOptions: RequestInit = {
//       method,
//       headers: {
//         "Content-Type": "application/json",
//         ...headers,
//       },
//     };

//     // Add body for methods that support it
//     if (["POST", "PUT", "PATCH", "DELETE"].includes(method) && finalBody) {
//       fetchOptions.body = finalBody;
//     }

//     // Make request
//     const response = await fetch(finalUrl, fetchOptions);

//     // Get response data
//     let responseBody: any;
//     const contentType = response.headers.get("content-type");

//     if (contentType?.includes("application/json")) {
//       responseBody = await response.json();
//     } else {
//       responseBody = await response.text();
//     }

//     return {
//       output: {
//         status: response.status,
//         body: responseBody,
//       },
//     };
//   } catch (error) {
//     console.error("HTTP executor error:", error);
//     throw error;
//   }
// }

// Get headers as object
// const responseHeaders: Record<string, string> = {};
// response.headers.forEach((value, key) => {
//   responseHeaders[key] = value;
// });
