import { UIMessage } from "ai";

export type ExecutorContextType = {
  outputs: Record<string, any>;
  history: UIMessage[];
  workflowRunId: string;
  channel: any;
};

export type ExecutorResultType = {
  output: any;
};

export type WorkflowUIMessage = UIMessage<
  never,
  {
    "data-workflow-node": {
      id: string;
      nodeType: string;
      nodeName: string;
      status: string;
      output?: any;
    };
  }
>;
