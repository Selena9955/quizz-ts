import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link, useSearchParams } from "react-router";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { getAllQuizzes, getUserRecord } from "@/api/quiz.api";
import type {
  FilterType,
  QuizListData,
  userRecordData,
} from "@/types/quiz.types";
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

function Quizzes() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [quizzes, setQuizzes] = useState<QuizListData[]>([]);
  const [filterType, setFilterType] = useState<FilterType>("ALL");
  const [currPage, setCurrPage] = useState<number>(1);
  const [allPage, setAllPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [userRecord, setUserRecord] = useState<userRecordData>();
  const [popularTags, setPopularTags] = useState<TagData[]>([
    { id: 20, name: "good" },
    { id: 3, name: "test" },
  ]);

  useEffect(() => {
    async function fetchUserRecord() {
      const data = await getUserRecord();
      setUserRecord(data);
    }
    fetchUserRecord();
  }, []);

  useEffect(() => {
    if (location.state?.reload) {
      fetchGetAll();

      // 清除 reload state（防止重整又觸發）
      navigate(location.pathname, { replace: true });
    }
  }, [location]);

  useEffect(() => {
    fetchGetAll();
  }, [location.key, currPage, filterType, pageSize]);

  async function fetchGetAll() {
    const data = await getAllQuizzes(filterType, currPage, pageSize);

    setQuizzes(data.items);
    setAllPage(data.totalPages);
  }

  useEffect(() => {
    setSearchParams({
      type: filterType,
      page: currPage.toString(),
      size: pageSize.toString(),
    });
  }, [filterType, currPage, pageSize]);

  function handleFilterChange(val: string | null) {
    if (val) {
      setFilterType(val as FilterType);
      setCurrPage(1);
    }
  }

  function handlePageSizeChange(size: number) {
    setPageSize(size);
    setCurrPage(1); // 換每頁數要跳回第一頁
  }

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

        <div className="relative z-2 container pt-32 pb-8">
          <div className="grid gap-6 rounded-md border bg-white p-5 shadow-sm md:grid-cols-[3fr_2fr] md:px-10 md:py-8">
            {/* 頭像 + 使用者資訊 */}
            <div className="flex items-center gap-4 md:gap-8 md:border-r">
              <Avatar className="size-20 md:size-28">
                <AvatarImage src={user?.avatarUrl} />
                <AvatarFallback>default</AvatarFallback>
              </Avatar>

              <div>
                <h2 className="text-lg font-semibold">
                  {user?.username ?? "登入解鎖統計功能"}
                </h2>
                <div className="text-muted-foreground text-sm">
                  <p>完成 {userRecord?.totalCount ?? 0} 題</p>
                  <p>
                    <span>答對 {userRecord?.correctCount ?? 0} 題</span>．
                    <span>正確率 {userRecord?.correctRate ?? 0}%</span>
                  </p>
                </div>
              </div>
            </div>

            {/* 最近答過的題目 */}
            <div className="flex flex-col justify-center space-y-2 text-sm">
              <h6 className="text-muted-foreground font-medium">
                最近答過的題目
              </h6>
              <ul className="grid gap-1">
                {userRecord?.recentQuizzes &&
                userRecord.recentQuizzes.length > 0 ? (
                  userRecord.recentQuizzes.map((quiz, index) => (
                    <li key={index}>
                      <Link
                        to={`/quizzes/${quiz.id}`}
                        className="text-primary hover:underline"
                      >
                        {quiz.title}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="text-muted-foreground">無紀錄</li>
                )}
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
                onValueChange={handleFilterChange}
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
                  value="FLASH"
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
                    每頁 {pageSize} 題
                    <ChevronDown className="text-gray-400" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => handlePageSizeChange(10)}>
                    每頁 10 題
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handlePageSizeChange(20)}>
                    每頁 20 題
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="grid divide-y rounded-md bg-white px-2 py-2 shadow-sm">
              {quizzes ? (
                quizzes.map((quiz) => (
                  <QuizCard key={quiz.id} quiz={quiz} className="px-2 py-3" />
                ))
              ) : (
                <div className="grid min-h-20 place-content-center">
                  <p>無資料</p>
                </div>
              )}
            </div>

            <PaginationGroup
              currentPage={currPage}
              totalPages={allPage}
              onPageChange={(page) => {
                setCurrPage(page);
              }}
            />
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
