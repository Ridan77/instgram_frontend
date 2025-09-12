import { useState } from "react";

export function ReadMore({ text, limit = 100 }) {
  const [expanded, setExpanded] = useState(false);

  if (!text) return null;

  const isLong = text.length > limit;
  const preview = isLong ? text.slice(0, limit) + "..." : text;

  return (
    <span>
      {expanded ? text : preview}
      {isLong && (
        <span
          onClick={() => setExpanded(!expanded)}
          style={{ color: "gray", cursor: "pointer", marginLeft: 4 }}
        >
          {expanded ? " less" : " more"}
        </span>
      )}
    </span>
  );
}

