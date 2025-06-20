import "quill/dist/quill.snow.css";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import QuillEditor, { type QuillEditorRef } from "@/components/QuillEditor";
import InputField from "@/components/InputField";
import { Label } from "@/components/ui/label";
import TagsInput from "@/components/TagsInput";
import {
  createArticle,
  getArticleById,
  updateArticle,
} from "@/api/article.api";
import { useParams, useNavigate } from "react-router";

function ArticleNew() {
  const navigate = useNavigate();
  const { id } = useParams();
  const editorRef = useRef<QuillEditorRef>(null);
  const [title, setTitle] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [editorValue, setEditorValue] = useState<string>("");

  // 依據路徑判斷是否要帶入值
  useEffect(() => {
    if (id) {
      getArticleById(id).then((data) => {
        console.log(data);
        setTitle(data.data.title);
        setEditorValue(data.data.content);
        setSelectedTags(data.data.tags);
      });
    } else {
      setTitle("");
      setEditorValue("");
      setSelectedTags([]);
    }
  }, [id]);

  async function handleSubmit() {
    const plainTextContent = editorRef.current?.getText() || "";
    const payload = {
      title,
      content: editorValue,
      previewContent: plainTextContent,
      tags: selectedTags,
    };
    try {
      if (id) {
        await updateArticle(id, payload);
        navigate(`/articles/${id}`);
      } else {
        await createArticle(payload);
        navigate("/articles");
      }
    } catch (err: any) {
      alert(err.message || "發佈失敗");
    }
  }

  return (
    <div className="defaultP container">
      <div className="mx-auto rounded-md bg-white px-3 py-6 lg:max-w-240 lg:px-8 lg:py-10">
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

        <div className="mt-5 space-y-3">
          <h6 className="font-semibold">標籤</h6>
          <TagsInput
            selectedTags={selectedTags}
            onChangeSelectedTags={setSelectedTags}
          />
        </div>

        <div className="mt-6 flex justify-end lg:justify-center">
          {id ? (
            <Button size="xl" onClick={handleSubmit}>
              保存修改
            </Button>
          ) : (
            <Button size="xl" onClick={handleSubmit}>
              新增文章
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArticleNew;
