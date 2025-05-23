import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router";

function Login() {
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
      <div className="flex justify-end">
        <Link
          to=""
          className="text-muted-foreground hover:text-muted-foreground/80"
        >
          忘記密碼?
        </Link>
      </div>
      <div className="text-center">
        <Button className="w-full text-center">登入</Button>
      </div>
    </>
  );
}

export default Login;
