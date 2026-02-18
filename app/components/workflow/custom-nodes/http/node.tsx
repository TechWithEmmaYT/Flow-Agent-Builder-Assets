"use client";

import React from "react";
import { Globe } from "lucide-react";
import { NodeProps } from "@xyflow/react";
import WorkflowNode from "../../workflow-node";
import HttpSettings from "./settings";

export const HttpNode = ({ data, selected, id }: NodeProps) => {
  const bgcolor = (data?.color as string) || "bg-blue-500";

  return (
    <>
      <WorkflowNode
        nodeId={id}
        label="HTTP"
        subText="Requests"
        icon={Globe}
        selected={selected}
        handles={{ target: true, source: true }}
        color={bgcolor}
        settingTitle="HTTP Node Settings"
        settingDescription="Configure the HTTP request settings"
        settingComponent={<HttpSettings id={id} data={data} />}
      />
    </>
  );
};
