import React from "react";
import { FlowVersion } from "../supervisor-agent/flow-version";

export default function Debugging() {
  return (
    <div className="w-full overflow-hidden">
      <FlowVersion isVisible={true} />
    </div>
  );
}
