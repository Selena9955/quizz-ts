import { login } from "@/api/auth.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import type { LoginFormData } from "@/types/auth.types";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [form, setForm] = useState<LoginFormData>({ email: "", password: "" });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const resData = await login(form);
      const isVerified = resData.data.isVerified;
      if (isVerified) {
        setUser(resData.data.user);
        console.clear();
        navigate("/");
      } else {
        navigate("/auth/verify", { state: { email: resData.data.email } });
      }
    } catch (err: any) {
      console.error(err.message);
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <Label className="mb-2 font-bold">信箱</Label>
        <Input
          type="email"
          placeholder="excample@gmail.com"
          name="email"
          autoComplete="email"
          onChange={handleFormChange}
        />
      </div>
      <div>
        <Label className="mb-2 font-bold">密碼</Label>
        <Input
          type="password"
          placeholder="密碼"
          name="password"
          autoComplete="current-password"
          onChange={handleFormChange}
        />
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
        <Button type="submit" className="w-full text-center">
          登入
        </Button>
      </div>
    </form>
  );
}

export default Login;
