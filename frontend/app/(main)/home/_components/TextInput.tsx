import React, { useRef, useEffect, forwardRef } from "react";

interface TextInputProps extends Omit<React.ComponentProps<"textarea">, "ref"> {
  className?: string;
}

const TextInput = forwardRef<HTMLTextAreaElement, TextInputProps>(
  (props, ref) => {
    useEffect(() => {
      const textarea = ref && "current" in ref ? ref.current : null;

      if (textarea) {
        const resizeTextarea = () => {
          textarea.style.height = "auto";
          textarea.style.height = `${textarea.scrollHeight}px`;
        };

        textarea.addEventListener("input", resizeTextarea);
        resizeTextarea();

        return () => {
          textarea.removeEventListener("input", resizeTextarea);
        };
      }
    }, [ref]);

    return (
      <textarea
        name="content"
        {...props}
        ref={ref}
        className={`w-full bg-base-100 block focus:outline-none resize-none overflow-hidden ${
          props.className || ""
        }`}
      />
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;
