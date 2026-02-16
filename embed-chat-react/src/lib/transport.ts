import { DefaultChatTransport } from "ai";

export const createWorkflowTransport = ({
  workflowId,
}: {
  workflowId: string;
}) =>
  new DefaultChatTransport({
    api: `${import.meta.env.VITE_API_URL}/api/upstash/trigger`,
    async prepareSendMessagesRequest({ messages }) {
      return {
        body: {
          workflowId,
          messages,
        },
      };
    },
    prepareReconnectToStreamRequest: (data) => {
      return {
        ...data,
        headers: { ...data.headers, "x-is-reconnect": "true" },
      };
    },
    fetch: async (input, init) => {
      const triggerRes = await fetch(input, init);
      const triggerData = await triggerRes.json();
      const workflowRunId = triggerData.workflowRunId;

      return fetch(
        `${import.meta.env.VITE_API_URL}/api/workflow/chat?id=${workflowRunId}`,
        {
          method: "GET",
        }
      );
    },
  });
