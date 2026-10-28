import { Fragment } from "react";

// Renders *word* as the serif italic accent and \n as a line break.
export default function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*[^*]+\*|\n)/).map((part, i) => {
        if (part === "\n") return <br key={i} />;
        if (part.length > 2 && part.startsWith("*") && part.endsWith("*"))
          return <em key={i}>{part.slice(1, -1)}</em>;
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}
