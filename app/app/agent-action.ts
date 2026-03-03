

  const systemPrompt = `You are a helpful assistant.

**Analyze the conversation flow:**
1. Check YOUR last message - did you ask the user for information?
2. If YES and the user is providing that information → treat it as a follow-up response
3. If NO or the user changes the topic → classify the message independently as a new intent

**System Instructions:**
${instructions}

${toolList ? `**Available tools:**\n${toolList}` : ""}`.trim()

function extractAgentContent(parts: any[]) {
  const content: any[] = [];

  parts?.filter(p => p.type === "data-workflow-node"
    && p.data?.nodeType === "agent")
    ?.map(p => {
      const { type, toolCall, toolResult, output } = p.data;

      if (type === "tool-call" && toolCall) {
        content.push({
          type: "tool-call",
          toolCallId: toolCall.toolCallId,
          toolName: toolCall.name
        });
      }
      if (type === "tool-result" && toolResult) {
        content.push({
          type: "tool-result",
          toolCallId: toolResult.toolCallId,
          toolName: toolResult.name,
          result: toolResult.result
        });
      }
      if (typeof output === "string") {
        content.push({
          type: "text",
          text: output
        });
      } else if (output?.text) {
        content.push({
          type: "text",
          text: output.text
        });
      }
    });

  return {
    role: "assistant" as const,
    content: content.length > 0 ? content : ""
  };
}
