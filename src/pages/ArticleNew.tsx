import "quill/dist/quill.snow.css";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import QuillEditor from "@/components/QuillEditor";

function ArticleNew() {
  const [editorValue, setEditorValue] = useState<string>("");

  function handleEditorChange(newValue: string) {
    setEditorValue(newValue);
  }

  return (
    <div>
      <QuillEditor value={editorValue} onChange={handleEditorChange} />

      <div className="mt-6 flex justify-end">
        <Button>Add</Button>
      </div>
      <p>{editorValue}</p>
    </div>
  );
}

export default ArticleNew;
