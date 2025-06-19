import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { Search } from "lucide-react";
import { search } from "@/api/search.api";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { ArticleListType } from "@/types/article.types";
import type { QuizListData } from "@/types/quiz.types";
import type { userCardData } from "@/types/auth.types";
import {
  SearchType,
  type SearchTypeKey,
  type SearchTypeValue,
} from "@/types/search.type";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import QuizCard from "@/components/QuizCard";
import LoadingIcon from "@/components/LoadingIcon";
import ArticleCard from "@/components/ArticleCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Result = {
  quizzes: QuizListData[];
  articles: ArticleListType[];
  users: userCardData[];
};

const tabLabels: Record<SearchTypeKey, string> = {
  QUIZ: "題目",
  ARTICLE: "文章",
  USER: "用戶",
};

function SearchResult() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("q");
  const navigate = useNavigate();
  const [results, setResults] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<SearchTypeValue>(SearchType.QUIZ);
  const [inputValue, setInputValue] = useState(keyword || "");

  useEffect(() => {
    if (!keyword) return;

    fetchData();
  }, [searchParams]);

  async function fetchData() {
    setLoading(true);
    try {
      const resData = await search({ q: keyword, type: activeTab });
      console.log(resData);
      setResults(resData);
    } catch (error) {
      toast.error("搜尋出現錯誤，請稍後嘗試");
    } finally {
      setLoading(false);
    }
  }

  function isEmptyResult(results: Result, tab: SearchTypeValue): boolean {
    switch (tab) {
      case SearchType.QUIZ:
        return results.quizzes.length === 0;
      case SearchType.ARTICLE:
        return results.articles.length === 0;
      case SearchType.USER:
        return results.users.length === 0;
      default:
        return true;
    }
  }

  function handleSearchTypeClick(type: number) {
    console.log(type);
    const trimmed = inputValue.trim();
    const query = new URLSearchParams();

    if (trimmed) {
      query.set("q", trimmed);
    }

    query.set("type", String(type));
    setActiveTab(type as SearchTypeValue);
    navigate(`/search?${query.toString()}`);
  }

  function handleSearch() {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    const query = `q=${encodeURIComponent(trimmed)}`;
    navigate(`/search?${query}`);
  }

  return (
    <>
      <div className="bg-primary -mt-14 px-4 pt-25 pb-8 text-white md:pt-32">
        <h1 className="text-center text-3xl font-bold md:text-5xl">搜尋</h1>
        <div className="mt-6 flex items-center justify-center gap-2 md:mt-8">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="搜尋題目、文章、標籤、用戶..."
            className="max-w-120 rounded-full bg-white text-black shadow-md placeholder:text-gray-500 lg:ml-9"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />
          <Button
            size="icon"
            className="bg-secondary rounded-full"
            onClick={handleSearch}
          >
            <Search />
          </Button>
        </div>
      </div>

      <nav className="bg-white shadow-sm">
        <div className="flex items-center justify-center text-sm font-medium text-gray-600">
          {Object.entries(SearchType).map(([key, value]) => (
            <button
              key={key}
              onClick={() => handleSearchTypeClick(value)}
              className={cn(
                "cursor-pointer px-6 py-2",
                activeTab === value
                  ? "bg-secondary text-white"
                  : "hover:bg-muted",
              )}
            >
              {tabLabels[key as SearchTypeKey]}
            </button>
          ))}
        </div>
      </nav>

      <div className="defaultP container xl:px-50">
        {loading ? (
          <LoadingIcon />
        ) : !results || isEmptyResult(results, activeTab) ? (
          <SearchNotResault />
        ) : (
          <>
            {/* 題目 */}
            {activeTab === SearchType.QUIZ && (
              <>
                <p>查詢到 {results.quizzes.length} 筆題目</p>
                <div className="mt-4 space-y-4">
                  {results.quizzes.map((quiz) => (
                    <div
                      key={quiz.id}
                      className="rounded-md bg-white p-3 shadow hover:shadow-md"
                    >
                      <QuizCard quiz={quiz} />
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* 文章 */}
            {activeTab === SearchType.ARTICLE && (
              <>
                <p>查詢到 {results.articles.length} 篇文章</p>
                <div className="mt-4 space-y-4">
                  {results.articles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              </>
            )}

            {/* 用戶 */}
            {activeTab === SearchType.USER && (
              <>
                <p>查詢到 {results.users.length} 位用戶</p>
                <div className="mt-4 space-y-4">
                  {results.users.map((user) => (
                    <Link
                      key={user.id}
                      to={`/users/${user.username}`}
                      className="flex items-center gap-6 rounded-md bg-white p-3 hover:shadow"
                    >
                      <Avatar className="size-20">
                        <AvatarImage src={user.avatarUrl} />
                        <AvatarFallback>default</AvatarFallback>
                      </Avatar>
                      <div className="space-y-2">
                        <p className="text-2xl">{user.username}</p>

                        <p
                          className="text-muted-foreground text-sm"
                          dangerouslySetInnerHTML={{
                            __html: (user.bio || "暫無簡介").replace(
                              /\n/g,
                              "<br />",
                            ),
                          }}
                        ></p>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}

function SearchNotResault() {
  return (
    <div className="grid min-h-100 place-content-center">
      <p>查無結果</p>
    </div>
  );
}

export default SearchResult;
