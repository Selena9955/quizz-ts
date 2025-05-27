import { Sparkle, Flame } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ArticleCard from "@/components/ArticleCard";

function Articles() {
  return (
    <div>
      <Tabs defaultValue="new">
        <TabsList>
          <TabsTrigger value="new" className="group gap-2">
            <Sparkle
              size="20"
              className="group-data-[state=active]:text-secondary"
            />
            最新
          </TabsTrigger>
          <TabsTrigger value="hot" className="group gap-2">
            <Flame
              size="20"
              className="group-data-[state=active]:text-secondary"
            />
            熱門
          </TabsTrigger>
        </TabsList>
        <div className="bg-muted mt-4 rounded-md p-3">
          <TabsContent value="new" className="my-2">
            {Array.from({ length: 10 }).map((_, index) => (
              <ArticleCard key={index} className="not-last:mb-3" />
            ))}
          </TabsContent>
          <TabsContent value="hot" className="my-2">
            測試
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

export default Articles;
