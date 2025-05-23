import type { ReactNode } from "react";
import { Link } from "react-router";

type ActivityPreviewProps = {
	icon: ReactNode;
	title: string;
	items: { id: string; text: string; link: string }[];
};

export default function ActivityPreview({ icon, title, items }: ActivityPreviewProps) {
	return (
		<div className=" p-2 rounded-lg bg-muted flex flex-col xl:p-3 ">
			<div className="flex gap-2 items-center mt-1 mb-3 ">
				<span className="text-secondary">{icon}</span>
				<h3 className="font-bold">{title}</h3>
			</div>
			<div className="bg-white px-3 rounded-md flex-1">
				{items.slice(0, 3).map((item, index) => (
					<Link
						key={item.id}
						to={item.link}
						className="block py-2 border-b-2 border-dashed border-secondary/30 last:border-0 hover:text-primary">
						<h6>{item.text}</h6>
					</Link>
				))}
			</div>
		</div>
	);
}
