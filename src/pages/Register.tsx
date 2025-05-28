import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

type ErrorMessage = {
  email: string;
  password: string;
  secondPassword: string;
  userName: string;
};

function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [secondPassword, setSecondPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [isUserNameValid, setIsUserNameValid] = useState<boolean>(false);
  const [message, setMessage] = useState<ErrorMessage>({
    email: "",
    password: "",
    secondPassword: "",
    userName: "",
  });

  // 用戶名檢查
  useEffect(() => {
    if (username.length < 2) return;

    const controller = new AbortController();

    async function checkUsername() {
      try {
        const res = await fetch(
          `http://localhost:8081/auth/check-username?username=${encodeURIComponent(username)}`,
          { signal: controller.signal }, // 支援中止
        );

        if (!res.ok) {
          throw new Error("伺服器錯誤，請稍後再試");
        }

        const data = await res.json();
        if (data.data.available) {
          setMessage((prev) => ({
            ...prev,
            userName: "可以使用",
          }));
          setIsUserNameValid(true);
        } else {
          setMessage((prev) => ({
            ...prev,
            userName: "用戶名已經被使用",
          }));
          setIsUserNameValid(false);
        }
      } catch (err) {
        console.error(err.message);
      }
    }

    checkUsername();

    // 清理函式
    return () => {
      controller.abort(); // 中止先前的請求
    };
  }, [username]);

  // 信箱，有變動會重整 isEmailValid
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setIsEmailValid(false); // ← 一改就強制重新驗證
    setMessage((prev) => ({
      ...prev,
      email: "", // 清空訊息
    }));
  };
  // 密碼
  const handlePwdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (e.target.value.length < 6) {
      setMessage((prev) => ({
        ...prev,
        password: "密碼長度需大於等於6個字",
      }));
    } else {
      setMessage((prev) => ({
        ...prev,
        password: "",
      }));
    }
  };
  // 二次密碼
  const handleSecondPwdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecondPassword(e.target.value);
    if (e.target.value !== password) {
      setMessage((prev) => ({
        ...prev,
        secondPassword: "兩次密碼不一致",
      }));
    } else {
      setMessage((prev) => ({
        ...prev,
        secondPassword: "",
      }));
    }
  };
  // 驗證信箱
  const handleCheckEmail = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setMessage((prev) => ({
        ...prev,
        email: "❌ 請輸入信箱正確格式",
      }));
      setIsEmailValid(false);
      return;
    }

    const res = await fetch(
      `http://localhost:8081/auth/check-email?email=${encodeURIComponent(email)}`,
    );

    if (!res.ok) {
      throw new Error("伺服器錯誤，請稍後再試");
    }

    const data = await res.json();
    if (data.data.available) {
      setMessage((prev) => ({
        ...prev,
        email: "✅ 信箱可以使用",
      }));
      setIsEmailValid(true);
    } else {
      setMessage((prev) => ({
        ...prev,
        email: "❌ 信箱已存在",
      }));
      setIsEmailValid(false);
    }
  };
  // 下一步前的檢查
  const handleNextStep = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!isEmailValid) {
      setMessage((prev) => ({
        ...prev,
        email: "❌ 請驗證信箱",
      }));

      return;
    }
    if (
      password.length < 6 ||
      secondPassword !== password ||
      !password ||
      !secondPassword
    ) {
      setMessage((prev) => ({
        ...prev,
        password: "❌ 密碼不得為空，且兩次密碼需相同",
      }));
      return;
    }

    setStep(2);
  };
  //註冊
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = { email, password, username };
    try {
      const res = await fetch("http://localhost:8081/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", // 因後端用 @RequestParam
        },
        body: new URLSearchParams(user).toString(),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "註冊失敗");
      }

      alert("✅ 註冊成功");
      navigate("/");
    } catch (err: any) {
      alert("❌ " + err.message);
    }
  };
  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {step === 1 && (
        <>
          <div>
            <Label className="mb-2 font-bold">信箱</Label>
            <div className="flex gap-4">
              <Input
                type="email"
                placeholder="信箱"
                value={email}
                onChange={(e) => handleEmailChange(e)}
                required
              />
              <Button
                type="button"
                variant="secondary"
                onClick={handleCheckEmail}
              >
                驗證
              </Button>
            </div>
            {message.email && (
              <p
                className={`${isEmailValid ? "text-primary" : "text-danger"} mt-1 text-sm`}
              >
                {message.email}
              </p>
            )}
          </div>
          <div>
            <Label className="mb-2 font-bold">密碼</Label>
            <Input
              type="password"
              placeholder="密碼"
              value={password}
              onChange={(e) => handlePwdChange(e)}
            />
            {message.password && (
              <p className="text-danger mt-1 text-sm">{message.password}</p>
            )}
          </div>
          <div>
            <Label className="mb-2 font-bold">確認密碼</Label>
            <Input
              type="password"
              placeholder="再次輸入密碼"
              value={secondPassword}
              onChange={(e) => handleSecondPwdChange(e)}
            />
            {message.secondPassword && (
              <p className="text-danger mt-1 text-sm">
                {message.secondPassword}
              </p>
            )}
          </div>

          <div className="text-center">
            <Button
              className="w-full text-center"
              onClick={(e) => handleNextStep(e)}
            >
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
            <Input
              type="text"
              placeholder="用戶名"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {message.userName && (
              <p
                className={`${isUserNameValid ? "text-primary" : "text-danger"} mt-1 text-sm`}
              >
                {message.userName}
              </p>
            )}{" "}
          </div>

          <div className="mt-10 flex gap-2 text-center">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => setStep(1)}
            >
              上一步
            </Button>
            <Button className="flex-1" type="submit">
              註冊
            </Button>
          </div>
        </>
      )}
    </form>
  );
}

export default Register;
