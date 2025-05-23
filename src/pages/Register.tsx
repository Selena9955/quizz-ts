import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Register() {
  return (
    <>
      <div>
        <Label className="mb-2 font-bold">信箱</Label>
        <Input type="email" placeholder="excample@gmail.com" />
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
        <Button className="w-full text-center">註冊</Button>
      </div>
    </>
  );
}

export default Register;
