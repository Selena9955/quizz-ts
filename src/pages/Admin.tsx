import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Legend,
  XAxis,
  YAxis,
  Cell,
} from "recharts";

function Admin() {
  const stats = [
    { label: "使用者總數", value: 12, icon: "👻" },
    { label: "管理員", value: 2, icon: "⚡" },
    { label: "本周新加入", value: 12, icon: "✨" },
    { label: "標籤數量", value: 24, icon: "🔥" },
    { label: "測驗題目", value: 14, icon: "📖" },
    { label: "文章總數", value: 3, icon: "📝" },
  ];

  const hotTags = [
    { name: "java", value: 25 },
    { name: "tailwind", value: 10 },
    { name: "數學", value: 2 },
    { name: "英文", value: 8 },
    { name: "html", value: 5 },
    { name: "mysql", value: 12 },
  ];

  const posts = [
    { name: "週一", Quizzes: 8, Articles: 5 },
    { name: "週二", Quizzes: 6, Articles: 7 },
    { name: "週三", Quizzes: 10, Articles: 4 },
    { name: "週四", Quizzes: 9, Articles: 6 },
    { name: "週五", Quizzes: 7, Articles: 8 },
    { name: "週六", Quizzes: 5, Articles: 3 },
    { name: "週日", Quizzes: 4, Articles: 6 },
  ];

  const userGrowth = [
    { name: "6月1日", value: 80 },
    { name: "6月2日", value: 150 },
    { name: "6月3日", value: 230 },
    { name: "6月4日", value: 320 },
    { name: "6月5日", value: 410 },
    { name: "6月6日", value: 520 },
    { name: "6月7日", value: 610 },
    { name: "6月8日", value: 730 },
    { name: "6月9日", value: 840 },
    { name: "6月10日", value: 960 },
  ];

  const colors = [
    "#d46868",
    "#ffdfa0",
    "#fce7f3",
    "#dbbeed",
    "#7ea9aa",
    "#5d768b",
  ];
  return (
    <div className="min-h-screen p-6">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-4xl font-light text-gray-800">
          Dashboard Analytics
        </h1>
        <p className="text-gray-500">測驗與文章管理系統</p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, idx) => (
          <div key={idx} className="rounded-xl bg-white p-5 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-gray-800">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-gray-500 uppercase">
                  {stat.label}
                </div>
              </div>
              <div className="text-3xl">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="mb-4 text-center text-lg font-semibold">熱門標籤</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                dataKey="value"
                data={hotTags}
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={50}
                paddingAngle={5}
                label
              >
                {hotTags.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl bg-white py-6 pr-8 shadow">
          <h2 className="mb-4 text-center text-lg font-semibold">
            測驗 & 文章發布數
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={posts}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Quizzes" fill="#e2d589" />
              <Bar dataKey="Articles" fill=" #84bd84" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mb-8 rounded-xl bg-white p-6 shadow">
        <h2 className="mb-4 text-center text-lg font-semibold">
          使用者成長趨勢
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={userGrowth}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#667eea"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Admin;
