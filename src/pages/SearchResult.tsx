import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { search } from "@/api/search.api";
import type { ArticleListType } from "@/types/article.types";
import type { QuizListData } from "@/types/quiz.types";
import type { TagDetailData } from "@/types/tag.types";
import ArticleCard from "@/components/ArticleCard";
import QuizCard from "@/components/QuizCard";
import { Badge } from "@/components/ui/badge";

type Result = {
  articles: ArticleListType[];
  quizzes: QuizListData[];
  tags: TagDetailData[];
};

function SearchResult() {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState<Result | null>(null);
  const [loading, setLoading] = useState(true);
  const keyword = searchParams.get("q");

  useEffect(() => {
    if (keyword) {
      setLoading(true);
    }
    async function fetchData() {
      setLoading(true);
      try {
        const resData = await search(keyword!);
        console.log(resData);
        setResults(resData);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [searchParams]);

  return (
    <div>
      <h1>搜尋結果：「{keyword}」</h1>
      {loading ? (
        <p>載入中...</p>
      ) : results ? (
        <>
          {results.articles.length > 0 &&
            results.articles.map((article) => (
              <>
                <ArticleCard
                  key={article.id}
                  article={article}
                  className="mb-3"
                />
              </>
            ))}
          {results.articles.length > 0 &&
            results.quizzes.map((quiz) => (
              <div className="mb-3">
                <QuizCard key={quiz.id} quiz={quiz} />
              </div>
            ))}
          {results.articles.length > 0 && (
            <>
              <p className="mt-10 mb-2">標籤</p>
              {results.tags.map((tag) => (
                <>
                  <Badge key={tag.id} className="bg-white">
                    {tag.name}
                  </Badge>
                </>
              ))}
            </>
          )}
        </>
      ) : (
        <p>找不到結果</p>
      )}
    </div>
  );
}

export default SearchResult;
