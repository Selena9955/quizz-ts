import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { cn } from "@/lib/utils";

type ArticleProps = {
  className?: string;
};

function Article({ className }: ArticleProps) {
  return (
    <div className={cn("rounded-lg border bg-white px-4 py-2", className)}>
      {/* 改成橫排 */}
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src="https://i0.wp.com/kevins-life.com/wp-content/uploads/2023/07/meme-marketing-2.png?resize=600%2C432&ssl=1" />
          <AvatarFallback>13</AvatarFallback>
        </Avatar>
        <div className="text-muted-foreground text-sm">2 hours ago</div>
      </div>
      <h3 className="mt-2 font-bold">
        標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題
      </h3>
    </div>
  );
}

export default Article;
