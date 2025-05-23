import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import { FileClock, NotebookPen, ChevronsRight, Info } from "lucide-react";
import { Tag } from "@/components/ui/tag";

import { Link } from "react-router";
import "swiper/css";
import "swiper/css/pagination";
import Article from "@/components/Article";
import ActivityPreview from "@/components/ActivityPreview";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";

function Home() {
  return (
    <div className="w-full py-6">
      {/* 使用者活動紀錄 */}
      <section>
        <h1 className="mb-3 text-2xl font-bold">歡迎回來</h1>
        <div className="grid grid-cols-1 items-stretch gap-3 lg:grid-cols-2 xl:grid-cols-3">
          <ActivityPreview
            icon={<FileClock />}
            title="繼續閱讀"
            items={[
              { id: "1", text: "關於CICD的基本問題", link: "#" },
              {
                id: "2",
                text: "超級綠水靈組隊任務第一關題目的解答是什麼？",
                link: "#",
              },
              {
                id: "3",
                text: "白沙屯媽祖求週六早上台北出發順風車",
                link: "#",
              },
            ]}
          />
          <ActivityPreview
            icon={<NotebookPen />}
            title="再次答題"
            items={[
              {
                id: "1",
                text: "身為騎士的您，行經路口遇有違規車輛，以下敘述何者正確？",
                link: "#",
              },
              {
                id: "2",
                text: "高速行駛中驟然煞車及加速，可以展現我的騎乘技術。",
                link: "#",
              },
              { id: "3", text: "String 與 StringBuilder 差異？", link: "#" },
            ]}
          />
          <ActivityPreview
            icon={<Info />}
            title="最新公告"
            items={[
              { id: "1", text: "公告標題", link: "#" },
              { id: "2", text: "公告標題", link: "#" },
              { id: "3", text: "公告標題", link: "#" },
            ]}
          />
        </div>
      </section>
      {/* 熱門標籤 */}
      <section className="mt-10">
        <h2 className="mb-3 text-lg font-bold">熱門標籤</h2>
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={10}
          freeMode={true}
          modules={[FreeMode]}
          className="items-center"
        >
          <SwiperSlide style={{ width: "auto" }}>
            <Tag>測試 </Tag>
          </SwiperSlide>
          <SwiperSlide style={{ width: "auto" }}>
            <Tag>測試測試測試測試 </Tag>
          </SwiperSlide>
          <SwiperSlide style={{ width: "auto" }}>
            <Tag>測試測試測試測試 </Tag>
          </SwiperSlide>
          <SwiperSlide style={{ width: "auto" }}>
            <Tag>測試測試測試測試 </Tag>
          </SwiperSlide>
          <SwiperSlide style={{ width: "auto" }}>
            <Tag>測試測試測試測試 </Tag>
          </SwiperSlide>
          <SwiperSlide style={{ width: "auto" }}>
            <Tag>測試測試測試測試 </Tag>
          </SwiperSlide>
          <SwiperSlide style={{ width: "auto" }}>
            <Tag>測試測試測試測試 </Tag>
          </SwiperSlide>
          <SwiperSlide style={{ width: "auto" }}>
            <Tag>測試測試測試測試 </Tag>
          </SwiperSlide>
          <SwiperSlide style={{ width: "auto" }}>
            <Tag>測試測試測試測試 </Tag>
          </SwiperSlide>
          <SwiperSlide style={{ width: "auto" }}>
            <Tag>測試測試測試測試 </Tag>
          </SwiperSlide>
          <SwiperSlide style={{ width: "auto" }}>
            <Tag>測試測試測試測試 </Tag>
          </SwiperSlide>
          <SwiperSlide style={{ width: "auto" }}>
            <Tag>測試 </Tag>
          </SwiperSlide>
        </Swiper>
      </section>
      {/* 精選題目 */}
      <section className="mt-10">
        <div className="flex justify-between">
          <h2 className="mb-3 text-lg font-bold">精選題目</h2>
          <Link to="" className="text-primary flex">
            <span className="font-bold">更多題目</span>
            <ChevronsRight />
          </Link>
        </div>
        <Swiper
          // install Swiper modules
          modules={[Pagination]}
          spaceBetween={10}
          slidesPerView={1}
          pagination={{ clickable: true, dynamicBullets: true }}
          scrollbar={{ draggable: true }}
          breakpoints={{
            768: {
              slidesPerView: 2, // 平板
            },
            992: {
              slidesPerView: 3, // 桌機
            },
          }}
          style={{
            "--swiper-pagination-bottom": "10px",
            paddingBottom: "40px",
            "--swiper-pagination-color": "oklch(50.8% 0.118 165.612)",
          }}
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <SwiperSlide style={{ width: "auto" }}>
              <Link
                to=""
                className="hover:border-primary/80 block flex-1 cursor-pointer rounded-lg border px-4 py-2 transition-colors duration-300 hover:shadow-md"
              >
                <h6 className="text-secondary">選擇題</h6>
                <h3 className="font-bold">
                  StringJava 中的類和 StringBuilder 類之間有什麼區別
                  StringBuffer？
                </h3>
                <p className="text-muted-foreground line-clamp-3 h-18">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Fugiat saepe eius nobis tempore consectetur itaque. Voluptates
                  laudantium repudiandae, atque delectus quisquam, animi, omnis
                  tempora quam nam libero perspiciatis dicta temporibus?
                </p>
                <div className="mt-3 flex gap-1">
                  <Tag>測試 </Tag>
                  <Tag>測試測試 </Tag>
                  <Tag>測試 </Tag>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      {/* 文章推薦 + 推薦用戶 */}
      <section className="mt-8 flex flex-col gap-4 lg:flex-row">
        <div className="flex-2">
          <h2 className="mb-3 text-lg font-bold">你可能感興趣的文章</h2>

          <div className="bg-muted grid gap-3 rounded-md p-3">
            {Array.from({ length: 10 }).map(() => (
              <Article />
            ))}
          </div>
        </div>
        <div className="flex-1">
          <h2 className="mb-3 text-lg font-bold">推薦用戶</h2>
          <div className="bg-muted grid gap-3 rounded-lg p-3">
            {Array.from({ length: 5 }).map(() => (
              <div className="rounded-md bg-white p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://i0.wp.com/kevins-life.com/wp-content/uploads/2023/07/meme-marketing-2.png?resize=600%2C432&ssl=1" />
                      <AvatarFallback>13</AvatarFallback>
                    </Avatar>
                    <span>123131321</span>
                  </div>
                  <Button variant="outline">追蹤</Button>
                </div>
                <p className="text-muted-foreground line-clamp-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maxime facilis repellat blanditiis atque veritatis quae illum
                  aperiam, aspernatur laboriosam nesciunt quaerat cupiditate
                  modi obcaecati. Laborum veniam dicta culpa dignissimos
                  ducimus.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
