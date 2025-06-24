import { useEffect, useState } from "react";
import "quill/dist/quill.snow.css";
import { Link, useNavigate, useParams } from "react-router";
import { Ellipsis } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { deleteArticle, getArticleById } from "@/api/article.api";
import type { ArticleDetailType } from "@/types/article.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function ArticleDetail() {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<ArticleDetailType>();
  const [isAuthor, setIsAuthor] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) {
          navigate("/404", { replace: true });
          return;
        }
        const data = await getArticleById(id);
        console.log(data);

        setArticle(data.data);
        setIsAuthor(data.data.author.id === user?.id);
      } catch (err: any) {
        if (err.status === 404) {
          navigate("/404", { replace: true });
        } else {
          console.error("API 其他錯誤:", err);
        }
      }
    };

    fetchData();
  }, [id, navigate]);

  async function handleDelete(id: number) {
    if (!confirm("確定要刪除這篇文章嗎？")) return;

    try {
      await deleteArticle(id);
      navigate("/articles"); // 回列表頁
    } catch (err: any) {
      alert(err.message || "刪除失敗");
    }
  }

  if (!article) return <p>載入中...</p>;

  return (
    <div className="defaultP container">
      <article className="rounded-md bg-white p-3 md:p-8 lg:mx-20">
        <div className="flex gap-2">
          {article.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" size="sm">
              {tag}
            </Badge>
          ))}
        </div>
        <h1 className="mt-3 text-3xl font-bold">{article.title}</h1>
        <div className="mt-2 flex justify-between">
          <div className="text-muted-foreground flex flex-wrap items-center gap-2">
            <Avatar className="size-7">
              <AvatarImage src={article.author.avatarUrl} />
              <AvatarFallback>13</AvatarFallback>
            </Avatar>
            <div>{article.author.username}</div>
            <p className="text-xs">
              {article.createTime.slice(0, 10)}
              {article.createTime.slice(0, 10) !==
                article.updateTime.slice(0, 10) && (
                <>（更新：{article.updateTime.slice(0, 10)}）</>
              )}
            </p>
          </div>
          {isAuthor && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  <Ellipsis />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link to={`/articles/${article.id}/edit`}>修改</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDelete(article.id)}>
                  刪除
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        <hr className="mt-2 mb-5" />
        <div
          className="ql-editor"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>
    </div>
  );
}

export default ArticleDetail;
