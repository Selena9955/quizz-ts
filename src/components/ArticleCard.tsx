import type { ArticleListType } from "@/types/article.types";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router";

type ArticleProps = {
  article: ArticleListType;
  className?: string;
};

function Article({ article, className }: ArticleProps) {
  return (
    <Link to={`/articles/${article.id}`} className="block">
      <div
        className={cn(
          "rounded-md border bg-white px-4 py-2 shadow hover:shadow-lg",
          className,
        )}
      >
        <div className="flex items-center gap-2">
          <Avatar className="size-7">
            <AvatarImage src="https://i0.wp.com/kevins-life.com/wp-content/uploads/2023/07/meme-marketing-2.png?resize=600%2C432&ssl=1" />
            <AvatarFallback>13</AvatarFallback>
          </Avatar>
          <p>{article.author.username}</p>
          <div className="text-muted-foreground ml-auto text-sm">
            {article.createTime.slice(0, 10)}
          </div>
        </div>
        <hr className="mt-2 mb-3" />
        <h3 className="mb-2 text-2xl font-bold">{article.title}</h3>
        <p className="text-muted-foreground line-clamp-3">
          {article.previewContent}
        </p>

        <div className="mt-2 flex gap-3">
          {article.tags.map((tag, index) => (
            <Badge key={index} size="sm">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default Article;
