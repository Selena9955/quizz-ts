import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

function Article() {
	return (
		<div className="border py-2 px-4 rounded-lg bg-white">
			{/* 改成橫排 */}
			<div className="flex items-center gap-3">
				<Avatar>
					<AvatarImage src="https://i0.wp.com/kevins-life.com/wp-content/uploads/2023/07/meme-marketing-2.png?resize=600%2C432&ssl=1" />
					<AvatarFallback>13</AvatarFallback>
				</Avatar>
				<div className="text-sm text-muted-foreground">2 hours ago</div>
			</div>
			<h3 className="font-bold mt-2">標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題</h3>
		</div>
	);
}

export default Article;
