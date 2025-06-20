import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type TopNPieChartProps = {
  stats: Record<string, number>; // 如 {css: 2, tailwind: 3, ...}
  topN?: number; // 取前幾筆，預設 10
  title?: string; // 標題
};

const COLORS = [
  "#6366f1",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#14b8a6",
  "#f97316",
  "#84cc16",
  "#9ca3af", // 其他備用色
];

export default function TopNPieChart({ stats, topN = 10 }: TopNPieChartProps) {
  const entries = Object.entries(stats)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  const top = entries.slice(0, topN);
  const rest = entries.slice(topN);

  if (rest.length > 0) {
    const otherTotal = rest.reduce((sum, item) => sum + item.value, 0);
    top.push({ name: "其他", value: otherTotal });
  }

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            dataKey="value"
            data={top}
            cx="50%"
            cy="50%"
            outerRadius={100}
            labelLine={true}
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {top.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
