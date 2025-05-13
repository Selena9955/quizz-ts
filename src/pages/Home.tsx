import { Button } from "@/components/ui/button";

function Home() {
	return (
		<div className="w-full flex gap-4">
			<div className=" flex-3"></div>

			<aside className=" flex-1">
				<Button variant="default">default</Button>
				<Button variant="ghost">ghost</Button>
				<Button variant="link">link</Button>
				<Button variant="outline">outline</Button>
				<Button variant="secondary">secondary</Button>
			</aside>
		</div>
	);
}

export default Home;
