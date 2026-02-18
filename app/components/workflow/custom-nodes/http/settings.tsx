/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { Plus, X } from "lucide-react";
import { useReactFlow } from "@xyflow/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import MentionInput from "../../mention-input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface HttpSettingsProps {
  id: string;
  data: any;
}

const HTTP_METHODS = ["GET", "POST", "PUT", "DELETE", "PATCH"] as const;

interface HttpSettingsProps {
  id: string;
  data: any;
}

export const HttpSettings = ({ id, data }: HttpSettingsProps) => {
  const { method = "GET", url = "", headers = {}, body = "" } = data || {};

  const { updateNodeData } = useReactFlow();
  const [newHeaderKey, setNewHeaderKey] = useState("");
  const [newHeaderValue, setNewHeaderValue] = useState("");
  const [bodyValue, setBodyValue] = useState(body);

  const handleChange = (key: string, value: any) => {
    updateNodeData(id, { [key]: value });
  };

  const handleAddHeader = () => {
    if (newHeaderKey.trim()) {
      handleChange("headers", { ...headers, [newHeaderKey]: newHeaderValue });
      setNewHeaderKey("");
      setNewHeaderValue("");
    }
  };

  const handleRemoveHeader = (key: string) => {
    const { [key]: _, ...rest } = headers;
    handleChange("headers", rest);
  };

  return (
    <div className="space-y-4 pb-3">
      {/* Method */}
      <div className="space-y-2">
        <Label>HTTP Method</Label>
        <Select value={method} onValueChange={(v) => handleChange("method", v)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {HTTP_METHODS.map((m) => (
              <SelectItem key={m} value={m}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* URL */}
      <div className="space-y-2">
        <Label>URL</Label>
        <MentionInput
          nodeId={id}
          value={url}
          multiline={false}
          onChange={(v) => handleChange("url", v)}
          placeholder="https://api.example.com/endpoint"
        />
      </div>

      {/* Headers */}
      <div className="space-y-2">
        <Label>Headers</Label>
        {Object.entries(headers).map(([key, value]) => (
          <div
            key={key}
            className="flex items-center gap-2 p-2 border rounded bg-muted"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{key}</p>
              <p className="text-xs text-muted-foreground truncate">
                {value as string}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveHeader(key)}
            >
              <X className="size-4" />
            </Button>
          </div>
        ))}
        <div className="flex gap-2">
          <Input
            placeholder="Key"
            value={newHeaderKey}
            spellCheck={false}
            onChange={(e) => setNewHeaderKey(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddHeader()}
          />
          <Input
            placeholder="Value"
            value={newHeaderValue}
            spellCheck={false}
            onChange={(e) => setNewHeaderValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddHeader()}
          />
          <Button variant="outline" onClick={handleAddHeader} size="icon">
            <Plus className="size-4" />
          </Button>
        </div>
      </div>

      {/* Body */}
      {["POST", "PUT", "PATCH", "DELETE"].includes(method) && (
        <div className="space-y-2">
          <Label>Body (JSON)</Label>
          <Textarea
            value={bodyValue}
            onChange={(e) => setBodyValue(e.target.value)}
            onBlur={() => handleChange("body", bodyValue)}
            placeholder='{"key": "value"}'
            spellCheck={false}
            className="min-h-32"
          />
        </div>
      )}

      {/* Output Info */}
      <div className="text-xs text-muted-foreground space-y-1">
        <p>
          Access response:{" "}
          <code className="bg-muted px-1 rounded">{`{{${id}.output.body}}`}</code>
        </p>
        <p>
          Nested fields:{" "}
          <code className="bg-muted px-1 rounded">{`{{${id}.output.body.field}}`}</code>
        </p>
      </div>
    </div>
  );
};

export default HttpSettings;
