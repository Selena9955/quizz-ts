import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type LineKey = {
  key: string; // 對應資料欄位 key (e.g. "articles", "data1")
  label: string; // 在圖例上顯示的名稱
  color?: string; // 線條顏色
};

type GenericLineChartProps = {
  data: Record<string, any>[]; // 任意資料列，需包含 xKey 與各條線對應欄位
  xKey: string; // x 軸欄位名稱 (e.g. "date", "hour")
  lines: LineKey[]; // 要繪製的線條資訊
  title?: string; // 可選標題
};

export default function GenericLineChart({
  data,
  xKey,
  lines,
  title,
}: GenericLineChartProps) {
  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          {lines.map(({ key, label, color }) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={color || "#8884d8"}
              name={label}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
