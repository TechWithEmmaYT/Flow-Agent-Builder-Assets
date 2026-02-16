/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { ArrowUp, Plus } from "lucide-react";
import { type UIMessage, useChat } from "@ai-sdk/react";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputBody,
  PromptInputSubmit,
  PromptInputTextarea,
  type PromptInputMessage,
} from "@/components/ai-elements/prompt-input";
import { Button } from "@/components/ui/button";
import { DotsLoader } from "@/components/ui/loader";
import { createWorkflowTransport } from "@/lib/transport";

const EmbedChat = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const workflowId = searchParams.get("workflow_id") || "";
  const [input, setInput] = useState<string>("");
  const [chatId, setChatId] = useState<string>(() => crypto.randomUUID());

  const { messages, sendMessage, status } = useChat<UIMessage>({
    id: chatId,
    messages: [],
    transport: createWorkflowTransport({ workflowId }),
  });

  const isLoading =
    status === "submitted" ||
    (status === "streaming" &&
      !messages[messages.length - 1]?.parts.some(
        (part) => part.type === "text" && part.text
      ));

  const handleSubmit = (message: PromptInputMessage) => {
    if (!message.text?.trim()) return;
    sendMessage({ text: message.text });
    setInput("");
  };

  const handleNewChat = () => {
    setChatId(crypto.randomUUID());
  };

  return (
    <div className="relative flex flex-col h-screen bg-background rounded-xl shadow-lg overflow-hidden border max-w-md mx-auto">
      {/* Header */}
      <div className="bg-primary px-6 py-4 flex items-center justify-between text-white">
        <h5 className="text-lg font-bold">Chat</h5>
        <Button variant="ghost" size="sm" onClick={handleNewChat}>
          <Plus size={14} /> New
        </Button>
      </div>

      {/* Chat Content */}
      <div className="relative flex flex-col flex-1 overflow-hidden">
        {messages.length > 0 ? (
          <Conversation className="flex-1">
            <ConversationContent className="pt-8 px-4 gap-1!">
              {messages.map((message) => (
                <Message from={message.role} key={message.id}>
                  <MessageContent className="text-sm gap-1!">
                    {message.parts.map((part, i) => {
                      switch (part.type) {
                        case "text":
                          return (
                            <MessageResponse key={`${message.id}-user-${i}`}>
                              {part.text}
                            </MessageResponse>
                          );
                        case "data-workflow-node": {
                          const data = part.data as {
                            type:
                              | "text-delta"
                              | "tool-call"
                              | "tool-result"
                              | "reasoning";
                            output?: any;
                          };
                          if (data.type !== "text-delta" && !data.output)
                            return null;

                          return (
                            <MessageResponse
                              key={`${message.id}-text-delta-${i}`}
                            >
                              {typeof data.output === "string"
                                ? data.output
                                : undefined}
                            </MessageResponse>
                          );
                        }
                      }
                    })}
                  </MessageContent>
                </Message>
              ))}
              {isLoading && (
                <div className="px-2">
                  <DotsLoader size="md" />
                </div>
              )}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-end py-8 px-4">
            <Greeting />
          </div>
        )}

        <div className="p-4 bg-background border-t">
          <PromptInput
            className="rounded-xl shadow-sm border"
            inputGroupClassName="h-[55px]! relative! py-1"
            onSubmit={handleSubmit}
          >
            <PromptInputBody>
              <PromptInputTextarea
                onChange={(e: any) => setInput(e.target.value)}
                value={input}
                placeholder="Type your message…"
                className="py-5! mr-8! text-sm! h-auto!"
              />
              <PromptInputSubmit
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 p-0 rounded-xl bg-primary text-primary-foreground"
              >
                <ArrowUp size={18} />
              </PromptInputSubmit>
            </PromptInputBody>
          </PromptInput>
        </div>
      </div>
    </div>
  );
};

function Greeting() {
  return (
    <div className="w-full h-full md:mt-3 px-0 flex flex-col">
      <div className="text-xl font-semibold opacity-0 fade-in-up [animation-delay:200ms]">
        Hello there!
      </div>
      <div className="text-xl  text-zinc-500 opacity-0 fade-in-up [animation-delay:400ms]">
        How can I help you today?
      </div>
    </div>
  );
}

export default EmbedChat;
