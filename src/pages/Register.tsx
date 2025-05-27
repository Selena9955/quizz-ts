import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

function Register() {
  const [step, setStep] = useState(1);
  return (
    <>
      {step === 1 && (
        <>
          <div>
            <Label className="mb-2 font-bold">信箱</Label>
            <div className="flex gap-4">
              <Input type="email" placeholder="信箱" />
              <Button variant="secondary">驗證</Button>
            </div>
          </div>
          <div>
            <Label className="mb-2 font-bold">密碼</Label>
            <Input type="password" placeholder="密碼" />
          </div>
          <div>
            <Label className="mb-2 font-bold">確認密碼</Label>
            <Input type="password" placeholder="再次輸入密碼" />
          </div>

          <div className="text-center">
            <Button className="w-full text-center" onClick={() => setStep(2)}>
              下一步
            </Button>
          </div>
        </>
      )}
      {step === 2 && (
        <>
          <div>
            <Label className="mb-2 font-bold">用戶名</Label>
            <p className="text-muted-foreground mb-4 text-xs">
              註冊後可至會員設定再次修改
            </p>
            <div className="flex gap-4">
              <Input type="text" placeholder="用戶名" />
              <Button variant="secondary">驗證</Button>
            </div>
          </div>

          <div className="mt-10 flex gap-2 text-center">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => setStep(1)}
            >
              上一步
            </Button>
            <Button className="flex-1">註冊</Button>
          </div>
        </>
      )}
    </>
  );
}

export default Register;
