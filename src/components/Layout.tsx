import { Outlet } from "react-router";
import Header from "./Header";

function App() {
  return (
    <>
      <Header />
      <main className="container mt-14">
        <Outlet />
      </main>
    </>
  );
}

export default App;
