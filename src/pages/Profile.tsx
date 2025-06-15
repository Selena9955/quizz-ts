import { useEffect, useState } from "react";
import type { ArticleListType } from "@/types/article.types";
import type { QuizListData } from "@/types/quiz.types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileEditDialog from "@/components/ProfileEditDialog";
import type { ProfileData } from "@/types/auth.types";
import { getUserProfileById } from "@/api/user.api";
import { useParams } from "react-router";
import LoadingIcon from "@/components/LoadingIcon";
import { useAuth } from "@/context/AuthContext";

type StatItem = {
  label: string;
  value: string;
};
const defaultProfile = {
  id: 0,
  username: "預設模板",
  bio: "暫無個人簡介",
  avatarUrl: "",
  bgUrl: "/default-bg.jpg",
  quizCount: 0,
  articleCount: 0,
  followers: 0,
};

function Profile() {
  const { user } = useAuth();
  const { username } = useParams();
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [stats, setStats] = useState<StatItem[]>([
    { label: "文章數", value: "0" },
    { label: "題目數", value: "0" },
    { label: "粉絲數", value: "0" },
  ]);

  useEffect(() => {
    if (!username) return;

    async function fetchData() {
      try {
        setIsLoading(true);
        const resData = await getUserProfileById(username!);
        setProfile(resData);
        setStats([
          { label: "文章數", value: formatNumber(resData.articleCount ?? 0) },
          { label: "題目數", value: formatNumber(resData.quizCount ?? 0) },
          { label: "粉絲數", value: formatNumber(resData.followers ?? 0) },
        ]);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [username]);

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
    <>
      {isLoading ? (
        <div className="h-160">
          <LoadingIcon />
        </div>
      ) : (
        <section className="rounded-md bg-white lg:mx-40">
          <div className="h-50 overflow-hidden rounded-t-md md:h-80">
            <img
              src={profile.bgUrl || "/default-bg.jpg"}
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
              {user?.id === profile.id && (
                <ProfileEditDialog profileData={profile} />
              )}
            </div>
            <p className="mt-4 md:mt-8">{profile.bio || "暫無簡介"}</p>
            <div className="mt-10 grid grid-cols-2 space-y-8 md:grid-cols-3">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center first:border-r md:border-r md:last:border-r-0"
                >
                  <div className="text-secondary text-xl font-bold">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* <section className="mt-8 lg:mx-40">
        <Tabs defaultValue="quizzes">
          <TabsList>
            <TabsTrigger value="quizzes">題目</TabsTrigger>
            <TabsTrigger value="articles">文章</TabsTrigger>
          </TabsList>
          <TabsContent
            value="quizzes"
            className="grid min-h-40 place-items-center"
          >
            {quizzes && quizzes.length > 0 ? <></> : <p>尚未發表任何題目</p>}
          </TabsContent>
          <TabsContent
            value="articles"
            className="grid min-h-40 place-items-center"
          >
            {articles && articles.length > 0 ? <></> : <p>尚未發表任何文章</p>}
          </TabsContent>
        </Tabs>
      </section> */}
    </>
  );
}

export default Profile;
