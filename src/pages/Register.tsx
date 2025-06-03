import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { validatePwd } from "@/utils/validationPwd";
import {
  checkEmailRegistered,
  checkUsernameRegistered,
  register,
} from "@/api/auth";
import type { AuthMessage, registerFormData } from "@/types/Auth";
import { Button } from "@/components/ui/button";
import InputField from "@/components/InputField";

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  const [form, setForm] = useState<registerFormData>({
    email: "",
    password: "",
    secondPassword: "",
    username: "",
  });
  const [msg, setMsg] = useState<AuthMessage>({
    email: "",
    password: "",
    secondPassword: "",
    userName: "",
  });
  const [isUserNameValid, setIsUserNameValid] = useState<boolean>(false);

  // 用戶名檢查
  useEffect(() => {
    const controller = new AbortController();
    const { username } = form;

    async function validateUsername() {
      if (username.trim().length < 2) {
        setMsg((prev) => ({ ...prev, userName: "❌ 用戶名至少 2 個字" }));
        setIsUserNameValid(false);
        return;
      }

      try {
        const res = await checkUsernameRegistered(username, controller.signal);
        if (res.data.available) {
          setMsg((prev) => ({ ...prev, userName: "可以使用" }));
          setIsUserNameValid(true);
        } else {
          setMsg((prev) => ({ ...prev, userName: "用戶名已經被使用" }));
          setIsUserNameValid(false);
        }
      } catch (err) {
        console.error(err);
      }
    }

    validateUsername();
    // 清理函式
    return () => {
      controller.abort(); // 中止先前的請求
    };
  }, [form.username]);

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleNextStep(e) {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // 檢查 Email 格式
    if (!emailRegex.test(form.email)) {
      setMsg((prev) => ({
        ...prev,
        email: "❌ 請輸入信箱正確格式",
      }));
      return;
    }

    if (!validatePwd(form.password, form.secondPassword, setMsg)) return;

    try {
      const res = await checkEmailRegistered(form.email);
      const resData = await res.json();

      if (resData.data.available) {
        setStep(2);
        setMsg((prev) => ({
          ...prev,
          email: "",
        }));
      } else {
        setMsg((prev) => ({
          ...prev,
          email: "信箱已經被註冊",
        }));
      }
    } catch (err: any) {
      console.error(err.message);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isUserNameValid) return;
    try {
      const res = await register(form);
      const resData = await res.json();

      if (!res.ok) {
        throw new Error(resData.message || "註冊失敗");
      }

      navigate("/auth/verify", { state: { email: resData.data.email } });
    } catch (err: any) {
      console.error(err.message);
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {step === 1 && (
        <>
          <InputField
            label="信箱"
            type="email"
            name="email"
            value={form.email}
            onChange={handleFormChange}
            message={msg.email}
          />
          <InputField
            label="密碼"
            type="password"
            name="password"
            value={form.password}
            onChange={handleFormChange}
            message={msg.password}
            description="密碼長度需不得低於6個字"
          />
          <InputField
            label="確認密碼"
            type="password"
            name="secondPassword"
            value={form.secondPassword}
            onChange={handleFormChange}
            message={msg.secondPassword}
          />
          <Button className="mt-4 w-full text-center" onClick={handleNextStep}>
            下一步
          </Button>
        </>
      )}
      {step === 2 && (
        <>
          <InputField
            label="用戶名"
            type="text"
            name="username"
            value={form.username}
            onChange={handleFormChange}
            message={msg.userName}
            messageColor={isUserNameValid ? "text-primary" : "text-danger"}
            description="註冊後可至會員設定再次修改"
          />

          <div className="mt-6 flex gap-2 text-center">
            <Button
              type="button"
              variant="secondary"
              className="flex-1"
              onClick={() => setStep(1)}
            >
              上一步
            </Button>
            <Button type="submit" className="flex-1">
              註冊
            </Button>
          </div>
        </>
      )}
    </form>
  );
}
