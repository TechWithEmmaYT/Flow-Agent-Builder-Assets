/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Copy, Code } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CodeDialog({ workflowId }: { workflowId?: string }) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"script" | "iframe">("script");
  const [copied, setCopied] = useState(false);

  const domain = window.location.origin;

  const code = `<script src="${domain}/embed/embed.min.js" data-workflow-id="${workflowId}"></script>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant="ghost" size="sm" className="h-8 gap-2">
          <Code className="size-3.5" />
          Code
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Embed Workflow</DialogTitle>
          <DialogDescription>Add the script to your site.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Code Block */}
          <div className="relative rounded-lg border bg-zinc-950 dark:bg-black overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800 bg-zinc-900/50">
              <span className="text-xs font-mono text-muted">HTML</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-muted"
                onClick={copyToClipboard}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
              </Button>
            </div>
            <div className="p-4 overflow-x-auto">
              <pre className="text-sm font-mono text-white whitespace-pre-wrap break-all">
                {code}
              </pre>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
