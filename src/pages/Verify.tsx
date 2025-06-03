import { checkVerifyCode, sendVerifyCode } from "@/api/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useLocation } from "react-router";

export default function Verify() {
  const location = useLocation();
  const email = location.state?.email || "";
  const [msg, setMsg] = useState("");
  const [verifyCode, setVerifyCode] = useState("");

  async function handleSendCode() {
    try {
      const resData = await sendVerifyCode(email);
      setMsg(resData.message); // 顯示成功訊息
    } catch (err: any) {
      setMsg("❌ 發送失敗：" + err.message);
    }
  }

  // 送出驗證碼
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const resData = await checkVerifyCode(email, verifyCode);
      setMsg("✅ " + resData.message);
      alert("驗證成功");
    } catch (err: any) {
      setMsg("❌ 驗證失敗：" + err.message);
    }
  }

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label className="font-bold">驗證碼</Label>
        <p className="text-muted-foreground text-sm">
          點擊按鈕將驗證碼寄送至你的信箱，請查看郵件並輸入以下欄位。
        </p>
      </div>
      <div className="flex gap-4">
        <Input
          type="text"
          placeholder="輸入驗證碼"
          value={verifyCode}
          onChange={(e) => setVerifyCode(e.target.value)}
          required
        />
        <Button type="button" variant="secondary" onClick={handleSendCode}>
          發送驗證碼
        </Button>
      </div>
      {msg && <p className="text-sm">{msg}</p>}
      <Button type="submit" className="mt-3 w-full text-center">
        送出
      </Button>
    </form>
  );
}
