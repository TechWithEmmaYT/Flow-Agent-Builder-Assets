import { GlobeIcon, Server } from "lucide-react";
export const MODELS = [
  {
    value: "google/gemini-2.0-flash-001",
    label: "Gemini 2.0 Flash",
  },
  {
    value: "google/gemini-2.5-flash-lite",
    label: "Gemini 2.5 Flash Lite",
  },
  {
    value: "google/gemini-2.5-flash",
    label: "Gemini 2.5 Flash",
  },
  { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo" },
  { value: "claude-3-haiku", label: "Claude 3 Haiku (Fast)" },
];


export type MCPToolType = {
  name: string;
  description: string;
};

export type ToolType = {
  id: string;
  type: "native" | "mcp";
  name: string;
  description: string;
  icon: React.ElementType;
  tools?: MCPToolType[];
};

export const TOOLS: ToolType[] = [
  {
    id: "webSearch",
    type: "native",
    name: "Web Search",
    description: "Search the web",
    icon: GlobeIcon,
  },
  {
    id: "mcpServer",
    type: "mcp",
    name: "MCP Server",
    description: "Connect to external MCP server",
    icon: Server,
    tools: [],
  },
];
