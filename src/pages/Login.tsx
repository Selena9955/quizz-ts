import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

interface LoginForm {
  email: string;
  password: string;
}
function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [form, setForm] = useState<LoginForm>({ email: "", password: "" });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8081/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const resdata = await res.json();

      if (!res.ok) {
        throw new Error(resdata.message || "登入失敗");
      }

      const user = resdata.data.user;
      setUser(user);

      navigate("/");
    } catch (err: any) {
      alert("❌ " + err.message);
    }
  };
  return (
    <form className="space-y-4">
      <div>
        <Label className="mb-2 font-bold">信箱</Label>
        <Input
          type="email"
          placeholder="excample@gmail.com"
          name="email"
          onChange={handleFormChange}
        />
      </div>
      <div>
        <Label className="mb-2 font-bold">密碼</Label>
        <Input
          type="password"
          placeholder="密碼"
          name="password"
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
        <Button className="w-full text-center" onClick={handleSubmit}>
          登入
        </Button>
      </div>
    </form>
  );
}

export default Login;
