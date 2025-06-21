import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export function useAdminGuard(apiPath: string = "/db") {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8081${apiPath}`, { credentials: "include" })
      .then((res) => {
        if (!res.ok) {
          // 捕捉 401, 403, 500... 都導向 404
          navigate("/404", { replace: true });
          throw new Error(`Fetch error: ${res.status}`);
        }
        return res.text(); // or res.json()
      })
      .catch(() => {
        navigate("/404", { replace: true });
      })
      .finally(() => setLoading(false));
  }, [navigate, apiPath]);

  return loading;
}
