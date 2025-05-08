import { Outlet } from "react-router";
import Header from "./components/Header";

function App() {
	return (
		<>
			<Header />
			<main className="mt-14 w-full">
				<Outlet />
			</main>
		</>
	);
}

export default App;
