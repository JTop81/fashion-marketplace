import React, { useEffect, useRef, useState } from "react";

import { DescriptionStepProps } from "../description-step/model";

type MarkdownEditorProps = {
  formik: DescriptionStepProps;
};

const CHARACTER_LIMIT = 500;

export default ({
  formik: { values, errors, setFieldValue },
}: MarkdownEditorProps) => {
  const [charCount, setCharCount] = useState(values.description.length);
  const [activeFormats, setActiveFormats] = useState<string[]>([]);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = values.description;
    }
  }, [values.description]);

  const handleInputChange = () => {
    const inputValue = editorRef.current?.textContent || "";
    if (inputValue.length <= CHARACTER_LIMIT) {
      setCharCount(inputValue.length);
    }
  };

  const toggleFormatting = (command: string) => {
    document.execCommand(command, false);
    if (activeFormats.includes(command)) {
      setActiveFormats(activeFormats.filter((format) => format !== command));
    } else {
      setActiveFormats([...activeFormats, command]); // Add format
    }
  };

  const handleBlur = () => {
    const inputValue = editorRef.current?.innerHTML || "";
    setFieldValue("description", inputValue);
  };

  const isFormatActive = (command: string) => activeFormats.includes(command);

  return (
    <div className="flex flex-col w-full">
      <div
        id="description"
        ref={editorRef}
        className="border-2 border-stone-300 h-32 rounded w-full p-3"
        contentEditable
        suppressContentEditableWarning={true}
        onInput={handleInputChange}
        onBlur={handleBlur} // Save value on blur (focus lost)
        dangerouslySetInnerHTML={{ __html: values.description }}
        style={{
          overflowY: "auto",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      />

      <div className="flex justify-between mt-2">
        {charCount}/{CHARACTER_LIMIT}
        <div className="flex flex-row gap-10">
          <button
            type="button"
            onClick={() => toggleFormatting("bold")}
            style={{
              backgroundColor: isFormatActive("bold")
                ? "#e2e8f0"
                : "transparent",
            }}
          >
            <b>B</b>
          </button>
          <button
            type="button"
            onClick={() => toggleFormatting("italic")}
            style={{
              backgroundColor: isFormatActive("italic")
                ? "#e2e8f0"
                : "transparent",
            }}
          >
            <i>I</i>
          </button>
          <button
            type="button"
            onClick={() => toggleFormatting("underline")}
            style={{
              backgroundColor: isFormatActive("underline")
                ? "#e2e8f0"
                : "transparent",
            }}
          >
            <u>U</u>
          </button>
          <button
            type="button"
            onClick={() => toggleFormatting("strikeThrough")}
            style={{
              backgroundColor: isFormatActive("strikeThrough")
                ? "#e2e8f0"
                : "transparent",
            }}
          >
            <s>S</s>
          </button>
        </div>
      </div>

      {errors.description && (
        <div className="text-red-500 mt-1">{errors.description}</div>
      )}
    </div>
  );
};
