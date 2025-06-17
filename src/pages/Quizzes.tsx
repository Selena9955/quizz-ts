import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { getAllQuizzes } from "@/api/quiz.api";
import type { QuizListData } from "@/types/quiz.types";
import type { TagData } from "@/types/tag.types";
import QuizCard from "@/components/QuizCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PaginationGroup from "@/components/PaginationGroup";

const mockUser = {
  username: "99",
  avatarUrl: "https://picsum.photos/960", // 隨機產生頭像
  stats: {
    totalAnswered: 12,
    correctRate: 0.83,
    recentQuizzes: [
      {
        id: 1,
        title: "單字水果測驗",
      },
      { id: 2, title: "CSS Flex 基礎" },
      { id: 3, title: "Java 基礎入門" },
    ],
  },
};

type FilterType = "ALL" | "SINGLE" | "MULTIPLE" | "FLASHCARD";

function Quizzes() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState<QuizListData[]>([]);
  const [filterType, setFilterType] = useState<FilterType>("ALL");
  const [popularTags, setPopularTags] = useState<TagData[]>([
    { id: 20, name: "good" },
    { id: 3, name: "test" },
  ]);

  useEffect(() => {
    const shouldRefresh = location.state?.shouldRefresh;
    async function fetchGetAll() {
      const resData = await getAllQuizzes();
      console.log(resData);
      setQuizzes(resData.data);
    }

    if (shouldRefresh) {
      navigate(location.pathname, { replace: true });
      fetchGetAll();
      return;
    }
    fetchGetAll();
  }, [location.key]);
  return (
    <div className="pb-10">
      {/* 答題記錄面板 */}
      <section className="relative">
        <div
          className={cn(
            "absolute top-0 z-0 min-h-60 w-full bg-cover bg-center",
            !user?.profileBgUrl && "bg-primary/20",
          )}
          style={
            user?.profileBgUrl
              ? { backgroundImage: `url(${user.profileBgUrl})` }
              : undefined
          }
        ></div>

        <div className="relative z-10 container pt-32 pb-8">
          <div className="z-10 grid gap-6 rounded-md border bg-white p-5 shadow-sm md:grid-cols-[3fr_2fr] md:px-10 md:py-8">
            {/* 頭像 + 使用者資訊 */}
            <div className="flex items-center gap-4 md:gap-8">
              <Avatar className="size-20 md:size-28">
                <AvatarImage src={user?.avatarUrl} />
                <AvatarFallback>default</AvatarFallback>
              </Avatar>

              <div>
                <h2 className="text-lg font-semibold">
                  {user?.username ?? "尚未登入"}
                </h2>
                <p className="text-muted-foreground flex flex-wrap space-x-3 text-sm">
                  <span>完成 {mockUser.stats.totalAnswered} 題</span>
                  <span>
                    正確率 {Math.round(mockUser.stats.correctRate * 100)}%
                  </span>
                </p>
              </div>
            </div>

            {/* 最近答過的題目 */}
            <div className="flex flex-col justify-center space-y-2 text-sm md:items-center">
              <h6 className="text-muted-foreground font-medium">
                最近答過的題目
              </h6>
              <ul className="grid gap-1">
                {mockUser.stats.recentQuizzes.slice(0, 3).map((quiz) => (
                  <li key={quiz.id}>
                    <Link
                      to={`/quizzes/${quiz.id}`}
                      className="text-primary hover:underline"
                    >
                      {quiz.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          {/* 題目列表 */}
          <div className="lg:col-span-3">
            <div className="mb-3 flex justify-between">
              <ToggleGroup
                variant="outline"
                type="single"
                value={filterType}
                onValueChange={(val) => {
                  if (val) {
                    setFilterType(val as FilterType);
                  }
                }}
              >
                <ToggleGroupItem
                  value="ALL"
                  className="data-[state=on]:bg-primary data-[state=on]:text-white"
                >
                  全部
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="SINGLE"
                  className="data-[state=on]:bg-primary data-[state=on]:text-white"
                >
                  單選
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="MULTIPLE"
                  className="data-[state=on]:bg-primary data-[state=on]:text-white"
                >
                  多選
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="FLASHCARD"
                  className="data-[state=on]:bg-primary data-[state=on]:text-white"
                >
                  單字
                </ToggleGroupItem>
              </ToggleGroup>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="text-muted-foreground border-gray-200"
                  >
                    每頁 10 題
                    <ChevronDown className="text-gray-400" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>每頁 10 題</DropdownMenuItem>
                  <DropdownMenuItem>每頁 20 題</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="grid divide-y rounded-md bg-white px-2 py-2 shadow-sm">
              {quizzes.map((quiz) => (
                <QuizCard key={quiz.id} quiz={quiz} />
              ))}
            </div>
            <PaginationGroup />
          </div>

          {/* 熱門標籤 */}
          <aside className="self-start rounded-md bg-white p-4 shadow-sm">
            <h2 className="mb-3 text-base font-semibold">熱門標籤</h2>
            <div className="flex flex-wrap gap-2">
              {popularTags.length > 0 ? (
                popularTags.map((tag) => (
                  <Badge key={tag.id} className="px-3 py-1 text-sm">
                    {tag.name}
                  </Badge>
                ))
              ) : (
                <p className="text-muted-foreground text-sm">尚無標籤</p>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Quizzes;
