import QuizCard from "@/components/QuizCard";
import { useState } from "react";
import { Link } from "react-router";

function Home() {
  const [hotTags, setHotTags] = useState<string[]>([
    "設計",
    "程式",
    "醫學",
    "語言",
    "設計",
    "程式",
    "醫學",
    "語言",
    "設計",
    "程式",
  ]);

  return (
    <>
      <div>
        {/* Hero 區塊 */}
        <section
          className="relative h-[70vh] bg-cover bg-center"
          style={{ backgroundImage: "url('homeBg.png')" }}
        >
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative z-2 flex h-full flex-col items-center justify-center px-4 text-center text-white">
            <h1 className="mb-4 text-4xl font-bold md:text-6xl">
              找你需要的內容
            </h1>
            <div className="z-10 mt-3 w-full max-w-xl">
              <input
                type="text"
                placeholder="搜尋文章、題目、作者..."
                className="w-full rounded-xl bg-white px-4 py-3 text-black shadow-md"
              />
            </div>
          </div>
        </section>

        {/* 熱門分類區塊 */}
        <section className="bg-white py-20 text-center">
          <h2 className="mb-6 text-2xl font-bold">探索熱門標籤</h2>
          <div className="container mx-auto grid max-w-5xl grid-cols-2 gap-6 md:grid-cols-5">
            {hotTags.map((category) => (
              <Link
                key={category}
                to=""
                className="hover:bg-secondary/80 cursor-pointer rounded-xl bg-gray-100 p-6 hover:text-white hover:shadow"
              >
                <p className="text-lg font-semibold">{category}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* 最新內容區塊 */}
        <section className="bg-gray-50 py-20">
          <h2 className="mb-6 text-center text-2xl font-bold">最新上架</h2>
          <div className="mx-auto max-w-4xl space-y-4 px-4">
            {[0, 1, 2].map((i) => (
              <div className="rounded-xl bg-white p-4 shadow hover:shadow-lg">
                <QuizCard />
              </div>
            ))}
          </div>
        </section>

        {/* CTA 加入會員區塊 */}
        <section className="bg-primary py-12 text-center text-white">
          <h2 className="mb-4 text-3xl font-bold">還不是會員嗎？</h2>
          <p className="mb-6">立即註冊，解鎖更多內容與功能！</p>
          <Link
            to="/auth/register"
            className="text-primary rounded-xl bg-white px-6 py-3 font-semibold hover:bg-gray-100"
          >
            免費加入
          </Link>
        </section>
      </div>
    </>
  );
}

export default Home;
