import { Outlet } from "react-router";
import { Toaster } from "sonner";
import Header from "./Header";
import Footer from "./Footer";

function App() {
  return (
    <>
      <Header />
      <main className="bg-muted mt-14 min-h-[calc(100vh-3.5rem)]">
        <Outlet />
        <Toaster richColors position="top-center" expand={true} />
      </main>
      <Footer />
    </>
  );
}

export default App;
