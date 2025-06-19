import { Link, useLocation, useNavigate } from "react-router";
import { cn } from "@/lib/utils";
import { logout } from "@/api/auth.api"; // 根據你的 API 檔案路徑調整
import { useAuth } from "@/context/AuthContext"; // 假設你用這個管理登入狀態

type SidebarItemProps = {
  label: string;
  path: string;
  icon: React.ElementType;
  onClick?: () => void;
};

export function AdminSidebarItem({
  label,
  path,
  icon: Icon,
  onClick,
}: SidebarItemProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const isLogout = path === "/auth/logout";
  const isActive = location.pathname === path;

  const handleClick = async () => {
    if (isLogout) {
      try {
        const res = await logout();
        if (res.status === 200) {
          setUser(null);
          navigate("/");
        }
      } catch (err) {
        alert("⚠️ 登出失敗，請稍後再試");
      }
    } else {
      onClick?.(); // 呼叫外層用來關 sidebar 的函式
    }
  };

  const className = cn(
    "group w-full flex items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium transition-all cursor-pointer hover:bg-white/10",
    isActive &&
      !isLogout &&
      "relative bg-white/10 text-white before:absolute before:top-1 before:bottom-1 before:left-0 before:w-1 before:rounded-r-lg before:bg-white",
  );

  return isLogout ? (
    <button onClick={handleClick} className={className}>
      <div className="grid size-7 place-items-center rounded">
        <Icon className="size-4" />
      </div>
      {label}
    </button>
  ) : (
    <Link to={path} onClick={onClick} className={className}>
      <div className="grid size-7 place-items-center rounded">
        <Icon className="size-4" />
      </div>
      {label}
    </Link>
  );
}
