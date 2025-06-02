import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { useLocation } from "react-router";

export default function Verify() {
  const location = useLocation();
  const user = useAuth().user;
  const email = location.state?.email || user?.email || "";

  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <Label className="font-bold">驗證碼</Label>
        <p className="text-muted-foreground text-sm">
          點擊按鈕將驗證碼寄送至你的信箱，請查看郵件並輸入以下欄位。
        </p>
      </div>
      <p className="text-muted-foreground">{email}</p>
      <div className="flex gap-4">
        <Input type="text" placeholder="輸入驗證碼" required />
        <Button type="button" variant="secondary">
          發送驗證碼
        </Button>
      </div>
    </form>
  );
}
