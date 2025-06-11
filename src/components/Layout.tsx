import { Outlet, useLocation } from "react-router";
import Header from "./Header";

function App() {
  const pathname = useLocation().pathname;

  const useMutedBg =
    pathname === "/articles" ||
    pathname === "/tags" ||
    pathname === "/quizzes/new" ||
    /^\/articles\/\d+$/.test(pathname);
  return (
    <>
      <Header />
      <main
        className={`${useMutedBg ? "bg-muted" : ""} mt-14 min-h-[calc(100vh-3.5rem)] py-6 md:py-12`}
      >
        <div className="container">
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default App;
