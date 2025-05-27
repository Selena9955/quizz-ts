import { Link } from "react-router";
import { Tag } from "./ui/tag";

const ProblemCard = () => {
  return (
    <Link
      to=""
      className="hover:border-primary/80 block flex-1 cursor-pointer rounded-lg border px-4 py-2 transition-colors duration-300 hover:shadow-md"
    >
      <h6 className="text-secondary">選擇題</h6>
      <h3 className="font-bold">
        StringJava 中的類和 StringBuilder 類之間有什麼區別 StringBuffer？
      </h3>
      <p className="text-muted-foreground line-clamp-3 h-18">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat saepe
        eius nobis tempore consectetur itaque. Voluptates laudantium
        repudiandae, atque delectus quisquam, animi, omnis tempora quam nam
        libero perspiciatis dicta temporibus?
      </p>
      <div className="mt-3 flex gap-1">
        <Tag>測試 </Tag>
        <Tag>測試測試 </Tag>
        <Tag>測試 </Tag>
      </div>
    </Link>
  );
};

export default ProblemCard;
