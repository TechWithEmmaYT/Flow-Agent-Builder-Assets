import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import EmbedChat from "./embedchat.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <EmbedChat />
  </StrictMode>
);
