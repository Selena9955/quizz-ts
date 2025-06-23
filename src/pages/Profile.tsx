import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { ArticleListType } from "@/types/article.types";
import type { QuizListData } from "@/types/quiz.types";
import type { ProfileData } from "@/types/auth.types";
import { useAuth } from "@/context/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfileEditDialog from "@/components/ProfileEditDialog";
import LoadingIcon from "@/components/LoadingIcon";
import QuizCard from "@/components/QuizCard";
import ArticleCard from "@/components/ArticleCard";
import {
  getUserArticles,
  getUserProfileById,
  getUserQuizzes,
  toggleFollow,
} from "@/api/user.api";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const defaultProfile = {
  id: 0,
  username: "預設模板",
  bio: "暫無個人簡介",
  avatarUrl: "",
  profileBgUrl: "/default-bg.jpg",
  quizCount: 0,
  articleCount: 0,
  followers: 0,
};

function Profile() {
  const { user } = useAuth();
  const { username } = useParams();
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [statsMap, setStatsMap] = useState(
    new Map<string, string>([
      ["文章數", formatNumber(0)],
      ["題目數", formatNumber(0)],
      ["粉絲數", formatNumber(0)],
    ]),
  );
  const [quizzes, setQuizzes] = useState<QuizListData[] | null>(null);
  const [articles, setArticles] = useState<ArticleListType[] | null>(null);
  const [activeTab, setActiveTab] = useState<string>("quizzes");
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  useEffect(() => {
    if (!username) return;

    async function fetchData() {
      try {
        setIsLoading(true);
        const resData = await getUserProfileById(username!);
        setProfile(resData);
        setStatsMap(
          new Map<string, string>([
            ["文章數", formatNumber(resData.articleCount ?? 0)],
            ["題目數", formatNumber(resData.quizCount ?? 0)],
            ["粉絲數", formatNumber(resData.followers ?? 0)],
          ]),
        );
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [username]);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  useEffect(() => {
    if (activeTab === "articles") {
      fetchArticles(); // 每次點擊都重新載入
    } else if (activeTab === "quizzes") {
      fetchQuizzes(); // 若希望切回也更新，可放這裡
    }
  }, [activeTab]);

  async function fetchQuizzes() {
    try {
      const data = await getUserQuizzes(username!); // 自定 API function
      setQuizzes(data);
    } catch (err) {
      console.error("Failed to load quizzes", err);
    }
  }

  async function fetchArticles() {
    try {
      const data = await getUserArticles(username!); // 自定 API function
      setArticles(data);
    } catch (err) {
      console.error("Failed to load articles", err);
    }
  }

  async function handleToggleFollow() {
    try {
      const data = await toggleFollow(profile.id);
      setIsFollowing(data.isFollowing);
      setStatsMap((prev) => {
        const newMap = new Map(prev);
        newMap.set("粉絲數", formatNumber(data.followerCount));
        return newMap;
      });
    } catch (error) {
      toast.error("追蹤失敗，請稍侯再嘗試");
    }
  }

  function formatNumber(num: number): string {
    const n = Number(num);
    if (isNaN(n)) return "0";

    if (num >= 1_000_000_000)
      return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
    if (num >= 1_000_000)
      return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
    return num.toString();
  }

  return (
    <div className="defaultP container">
      {isLoading ? (
        <div className="h-160">
          <LoadingIcon />
        </div>
      ) : (
        <section className="rounded-md bg-white lg:mx-40">
          <div className="h-50 overflow-hidden rounded-t-md md:h-80">
            <img
              src={profile.profileBgUrl || "/default-bg.jpg"}
              alt="profile-bg"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="relative px-5 pt-12 pb-5 md:px-10 md:pt-6">
            <Avatar className="absolute -top-10 size-20 border-2 border-white md:-top-16 md:size-32">
              <AvatarImage src={profile?.avatarUrl} />
              <AvatarFallback>default</AvatarFallback>
            </Avatar>
            <div className="flex justify-between md:ml-36">
              <h3 className="text-3xl">{profile.username}</h3>
              {user?.id === profile.id ? (
                <ProfileEditDialog
                  profileData={profile}
                  onChangeProfile={setProfile}
                />
              ) : (
                <Button
                  variant={isFollowing ? "default" : "outline"}
                  onClick={handleToggleFollow}
                >
                  追蹤
                </Button>
              )}
            </div>

            <p
              className="mt-4 whitespace-pre-wrap md:mt-8"
              //如有換行符號會自動插入<br />
              dangerouslySetInnerHTML={{
                __html: (profile.bio || "暫無簡介").replace(/\n/g, "<br />"),
              }}
            ></p>
            <div className="mt-10 grid grid-cols-2 space-y-8 md:grid-cols-3">
              {Array.from(statsMap.entries()).map(([label, value]) => (
                <div
                  key={label}
                  className="text-center first:border-r md:border-r md:last:border-r-0"
                >
                  <div className="text-secondary text-xl font-bold">
                    {value}
                  </div>
                  <div className="text-muted-foreground text-sm">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mt-8 min-h-100 lg:mx-40">
        <Tabs defaultValue="quizzes">
          <TabsList>
            <TabsTrigger
              value="quizzes"
              onClick={() => setActiveTab("quizzes")}
            >
              題目
            </TabsTrigger>
            <TabsTrigger
              value="articles"
              onClick={() => setActiveTab("articles")}
            >
              文章
            </TabsTrigger>
          </TabsList>

          <TabsContent value="quizzes" className="space-y-3">
            <div className="space-y-3">
              {quizzes && quizzes.length > 0 ? (
                quizzes.map((quiz) => (
                  <div
                    key={quiz.id}
                    className="rounded-md bg-white p-2 shadow md:px-4"
                  >
                    <QuizCard quiz={quiz} />
                  </div>
                ))
              ) : (
                <div className="grid min-h-40 place-items-center">
                  <p>尚未發表任何題目</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="articles" className="space-y-3">
            {articles && articles.length > 0 ? (
              articles.map((article, index) => (
                <ArticleCard key={index} article={article} />
              ))
            ) : (
              <div className="grid min-h-40 place-items-center">
                <p>尚未發表任何文章</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}

export default Profile;
