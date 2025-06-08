import "quill/dist/quill.snow.css";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import QuillEditor from "@/components/QuillEditor";
import InputField from "@/components/InputField";
import { Label } from "@/components/ui/label";
import TagsInput from "@/components/TagsInput";
import { Badge } from "@/components/ui/badge";

function ArticleNew() {
  const [title, setTitle] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [editorValue, setEditorValue] = useState<string>("");

  function handleEditorChange(newValue: string) {
    setEditorValue(newValue);
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
      <QuillEditor value={editorValue} onChange={handleEditorChange} />

      <div>
        <h6 className="mt-5 mb-2 font-semibold">標籤</h6>
        <div className="flex flex-wrap gap-1">
          {selectedTags &&
            selectedTags.map((tag, index) => (
              <a href="">
                <Badge key={index}>{tag}</Badge>
              </a>
            ))}
          <TagsInput
            selectedTags={selectedTags}
            onChangeSelectedTags={setSelectedTags}
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <Button size="lg">新增文章</Button>
      </div>
      <p>{editorValue}</p>
    </div>
  );
}

export default ArticleNew;
