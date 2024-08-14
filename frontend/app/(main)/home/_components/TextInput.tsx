import React, { useRef, useEffect } from "react";

function TextInput({ ref }: { ref: React.RefObject<HTMLTextAreaElement> }) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;

    if (textarea) {
      const resizeTextarea = () => {
        textarea.style.height = "auto"; // Reset height
        textarea.style.height = `${textarea.scrollHeight}px`; // Adjust height
      };

      textarea.addEventListener("input", resizeTextarea);

      // Initial resize
      resizeTextarea();

      return () => {
        textarea.removeEventListener("input", resizeTextarea);
      };
    }
  }, []);

  return (
    <textarea
      name="content"
      placeholder="What is happening?!"
      className="w-full bg-base-100 block focus:outline-none resize-none overflow-hidden"
      ref={ref}
    />
  );
}

export default TextInput;
