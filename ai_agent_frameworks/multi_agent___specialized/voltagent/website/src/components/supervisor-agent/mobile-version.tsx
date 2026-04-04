import React from "react";
import { FlowVersion } from "./flow-version";

interface MobileVersion2Props {
  isVisible: boolean;
}

export function MobileVersion({ isVisible }: MobileVersion2Props) {
  return (
    <div className="w-full  mx-auto relative">
      <FlowVersion isVisible={isVisible} />
    </div>
  );
}
