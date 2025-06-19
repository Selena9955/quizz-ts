// useAdminGuard.ts
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export function useAdminGuard(apiPath: string = "/db") {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8081${apiPath}`, { credentials: "include" })
      .then((res) => {
        if (res.status === 403 || res.status === 401) {
          navigate("/404", { replace: true });
        }
        return res.text();
      })
      .catch(() => {
        navigate("/404", { replace: true });
      })
      .finally(() => setLoading(false));
  }, [navigate, apiPath]);

  return loading;
}
