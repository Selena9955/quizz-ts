import { Sparkle, Flame } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ArticleCard from "@/components/ArticleCard";
import { useEffect, useState } from "react";
import { getAllArticles } from "@/api/article.api";
import type { ArticleListType } from "@/types/article.types";

function Articles() {
  const [articles, setArticles] = useState<ArticleListType[]>([]);

  useEffect(() => {
    async function fetchArticles() {
      const data = await getAllArticles();
      setArticles(data.data);
    }
    fetchArticles();
  }, []);

  return (
    <div className="defaultP container">
      <Tabs defaultValue="new">
        <TabsList>
          <TabsTrigger value="new" className="group gap-2">
            <Sparkle
              size="20"
              className="group-data-[state=active]:text-secondary"
            />
            最新
          </TabsTrigger>
        </TabsList>
        <div className="bg-muted mt-3 rounded-md">
          <TabsContent value="new" className="space-y-3">
            {articles &&
              articles.map((article, index) => (
                <ArticleCard key={index} article={article} />
              ))}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

export default Articles;
