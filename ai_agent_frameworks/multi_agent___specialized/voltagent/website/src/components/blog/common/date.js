import React from "react";

export function DateComponent({ date, formattedDate }) {
  return (
    <time dateTime={date} itemProp="datePublished">
      {formattedDate}
    </time>
  );
}
