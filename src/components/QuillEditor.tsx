import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";

type QuillEditorProps = {
  value?: string;
  onChange?: (value: string) => any;
};
const QuillEditor = ({ value, onChange }: QuillEditorProps): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastChangeRef = React.useRef<string | null>(null);

  const [quill, setQuill] = useState<Quill | null>(null);

  useEffect(() => {
    if (!quill) {
      return;
    }

    if (value !== lastChangeRef.current) {
      quill.root.innerHTML = value || "";
    }
  }, [quill, value]);

  useEffect(() => {
    if (!quill) {
      return;
    }

    function handleChange() {
      const contents = quill!.root.innerHTML;
      lastChangeRef.current = contents;

      console.log("HERE!");

      if (onChange) {
        onChange(contents);
      }
    }

    quill.on("text-change", handleChange);

    return () => {
      quill.off("text-change", handleChange);
    };
  }, [quill, onChange]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const editorElement = document.createElement("div");
    container.append(editorElement);
    let quill: Quill = new Quill(editorElement, {
      theme: "snow",
      modules: {
        toolbar: toolbarOptions,
      },
    });

    quill.root.innerHTML = value || "";

    setQuill(quill);

    return () => {
      container.innerHTML = "";
    };
  }, []);

  return <div ref={containerRef}></div>;
};

export default QuillEditor;

const toolbarOptions = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [
    "bold",
    "italic",
    "underline",
    "strike",
    { script: "sub" },
    { script: "super" },
  ],
  ["blockquote", "code-block", "link", "image"],
  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  [{ align: [] }, { indent: "-1" }, { indent: "+1" }],
  ["clean"],
];
