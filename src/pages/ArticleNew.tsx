import "quill/dist/quill.snow.css";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import QuillEditor, { type QuillEditorRef } from "@/components/QuillEditor";
import InputField from "@/components/InputField";
import { Label } from "@/components/ui/label";
import TagsInput from "@/components/TagsInput";
import { Badge } from "@/components/ui/badge";
import { createArticle } from "@/api/article.api";
import { useNavigate } from "react-router";

function ArticleNew() {
  const navigate = useNavigate();
  const editorRef = useRef<QuillEditorRef>(null);
  const [title, setTitle] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [editorValue, setEditorValue] = useState<string>("");

  async function handleSubmit() {
    const plainTextContent = editorRef.current?.getText() || "";
    const payload = {
      title,
      content: editorValue,
      previewContent: plainTextContent,
      tags: selectedTags,
    };
    try {
      await createArticle(payload);
      setTitle("");
      setSelectedTags([]);
      setEditorValue("");
      navigate("/articles");
    } catch (err: any) {
      alert(err.message || "發佈失敗");
    }
  }

  return (
    <div>
      <InputField
        label="標題"
        labelClassName=" text-base  md:text-lg  font-semibold"
        placeholder="請輸入標題"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Label className="mt-6 mb-2 text-base font-semibold md:text-lg">
        內文
      </Label>
      <QuillEditor
        value={editorValue}
        onChange={setEditorValue}
        ref={editorRef}
      />

      <div>
        <h6 className="mt-5 mb-2 font-semibold">標籤</h6>
        <div className="flex flex-wrap gap-1">
          {selectedTags &&
            selectedTags.map((tag, index) => <Badge key={index}>{tag}</Badge>)}
          <TagsInput
            selectedTags={selectedTags}
            onChangeSelectedTags={setSelectedTags}
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <Button size="lg" onClick={handleSubmit}>
          新增文章
        </Button>
      </div>
    </div>
  );
}

export default ArticleNew;
