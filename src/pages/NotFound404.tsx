import { Link } from "react-router";
import { Button } from "@/components/ui/button"; // 如果你用 shadcn/ui
import { Ghost } from "lucide-react"; // 任意 icon，也可以用 AlertTriangle

export default function NotFound404() {
  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center text-white"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1470&q=80')",
      }}
    >
      {/* 半透明遮罩 */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* 中央內容 */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <Ghost className="mb-4 h-16 w-16 text-white/80" />
        <h1 className="mb-2 text-4xl font-bold">404 - 找不到這個頁面</h1>
        <p className="mb-6 text-lg text-white/80">
          可能是網址錯了，或這頁面不存在。
        </p>

        <Button asChild variant="secondary">
          <Link to="/">回首頁</Link>
        </Button>
      </div>
    </div>
  );
}
