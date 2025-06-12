import { Outlet } from "react-router";
import Header from "./Header";

function App() {
  return (
    <>
      <Header />
      <main className="bg-muted mt-14 min-h-[calc(100vh-3.5rem)] py-6 md:py-12">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default App;
