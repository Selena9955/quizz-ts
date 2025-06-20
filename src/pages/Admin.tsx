import { Users, ShieldCheck, Ban } from "lucide-react";
import { dbGetTagTsage } from "@/api/admin.api";
import GenericLineChart from "@/components/GenericLineChart";
import TopNPieChart from "@/components/TopNPieChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function Admin() {
  const [tagStats, setTagStats] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(false);

  const weeklyData = [
    { date: "6/20", articles: 3, quizzes: 2 },
    { date: "6/21", articles: 2, quizzes: 3 },
    { date: "6/22", articles: 4, quizzes: 6 },
    { date: "6/23", articles: 6, quizzes: 4 },
    { date: "6/24", articles: 2, quizzes: 5 },
    { date: "6/25", articles: 7, quizzes: 13 },
    { date: "6/26", articles: 8, quizzes: 12 },
  ];

  const lines = [
    { key: "articles", label: "文章", color: "#6366f1" },
    { key: "quizzes", label: "題目", color: "#10b981" },
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const data = await dbGetTagTsage();
        setTagStats(data);
      } catch (error) {
        toast.error("標籤統計資料取得失敗");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);
  if (isLoading) return <p>載入中...</p>;
  return (
    <div className="grid grid-cols-1 gap-4 md:-m-8 md:max-h-dvh md:min-h-dvh md:grid-flow-col md:grid-cols-6 md:grid-rows-7 md:p-8">
      <Card className="md:col-span-2 md:row-span-1">
        1<p>管理員登入</p>
      </Card>
      <Card className="md:col-span-2 md:row-span-2">2</Card>

      <Card className="md:col-span-2 md:col-start-3 md:row-span-3">
        <div className="space-y-4 p-4">
          {/* 總會員數 */}
          <div className="flex flex-col items-start rounded-2xl bg-pink-100 p-4 shadow">
            <div className="mb-1 flex items-center gap-2 text-sm text-pink-600">
              <Users className="h-4 w-4" />
              <span className="font-medium tracking-wide">總會員數</span>
            </div>
            <div className="text-4xl font-bold text-pink-500">5689</div>
          </div>

          {/* 管理員數 */}
          <div className="flex flex-col items-start rounded-2xl bg-blue-100 p-4 shadow">
            <div className="mb-1 flex items-center gap-2 text-sm text-blue-600">
              <ShieldCheck className="h-4 w-4" />
              <span className="font-medium tracking-wide">管理員數</span>
            </div>
            <div className="text-4xl font-bold text-blue-700">6</div>
          </div>

          {/* 封鎖會員 */}
          <div className="flex flex-col items-start rounded-2xl bg-yellow-100 p-4 shadow">
            <div className="mb-1 flex items-center gap-2 text-sm text-yellow-600">
              <Ban className="h-4 w-4" />
              <span className="font-medium tracking-wide">封鎖會員</span>
            </div>
            <div className="text-4xl font-bold text-yellow-700">23</div>
          </div>
        </div>
      </Card>

      <Card className="md:col-span-2 md:col-start-5 md:row-span-3">4</Card>
      <Card className="md:col-span-3 md:row-span-4">
        <CardHeader>
          <CardTitle>熱門標籤</CardTitle>
        </CardHeader>
        <TopNPieChart stats={tagStats} />
      </Card>
      <Card className="md:col-span-3 md:row-span-4">
        <CardHeader>
          <CardTitle>近七天文章 & 題目發佈趨勢</CardTitle>
        </CardHeader>
        <CardContent>
          <GenericLineChart data={weeklyData} xKey="date" lines={lines} />
        </CardContent>
      </Card>
    </div>
  );
}

export default Admin;
