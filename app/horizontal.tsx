import { useScroll, useTransform, motion } from "motion/react";
import { useRef } from "react";

export default function Horizontal() {
  type CardType = {
    url: string;
    title: string;
    id: number;
  };

  const cards: CardType[] = [
    {
      url: "https://i.ytimg.com/vi/UznIh5Y9mwA/hqdefault.jpg?sqp=-oaymwEmCKgBEF5IWvKriqkDGQgBFQAAiEIYAdgBAeIBCggYEAIYBjgBQAE=&rs=AOn4CLDPL50r5uV8yrPrIInbvTqaS4-sTw",
      title: "Title 1",
      id: 1,
    },
    {
      url: "https://i.ytimg.com/vi/UznIh5Y9mwA/hqdefault.jpg?sqp=-oaymwEmCKgBEF5IWvKriqkDGQgBFQAAiEIYAdgBAeIBCggYEAIYBjgBQAE=&rs=AOn4CLDPL50r5uV8yrPrIInbvTqaS4-sTw",
      title: "Title 2",
      id: 2,
    },
    {
      url: "https://i.ytimg.com/vi/UznIh5Y9mwA/hqdefault.jpg?sqp=-oaymwEmCKgBEF5IWvKriqkDGQgBFQAAiEIYAdgBAeIBCggYEAIYBjgBQAE=&rs=AOn4CLDPL50r5uV8yrPrIInbvTqaS4-sTw",
      title: "Title 3",
      id: 3,
    },
    {
      url: "https://i.ytimg.com/vi/UznIh5Y9mwA/hqdefault.jpg?sqp=-oaymwEmCKgBEF5IWvKriqkDGQgBFQAAiEIYAdgBAeIBCggYEAIYBjgBQAE=&rs=AOn4CLDPL50r5uV8yrPrIInbvTqaS4-sTw",
      title: "Title 4",
      id: 4,
    },
    {
      url: "https://i.ytimg.com/vi/UznIh5Y9mwA/hqdefault.jpg?sqp=-oaymwEmCKgBEF5IWvKriqkDGQgBFQAAiEIYAdgBAeIBCggYEAIYBjgBQAE=&rs=AOn4CLDPL50r5uV8yrPrIInbvTqaS4-sTw",
      title: "Title 5",
      id: 5,
    },
    {
      url: "https://i.ytimg.com/vi/UznIh5Y9mwA/hqdefault.jpg?sqp=-oaymwEmCKgBEF5IWvKriqkDGQgBFQAAiEIYAdgBAeIBCggYEAIYBjgBQAE=&rs=AOn4CLDPL50r5uV8yrPrIInbvTqaS4-sTw",
      title: "Title 6",
      id: 6,
    },
    {
      url: "https://i.ytimg.com/vi/UznIh5Y9mwA/hqdefault.jpg?sqp=-oaymwEmCKgBEF5IWvKriqkDGQgBFQAAiEIYAdgBAeIBCggYEAIYBjgBQAE=&rs=AOn4CLDPL50r5uV8yrPrIInbvTqaS4-sTw",
      title: "Title 7",
      id: 7,
    },
  ];

  const Card = ({ card }: { card: CardType }) => {
    return (
      <div
        key={card.id}
        className="group relative h-[450px] w-[450px] overflow-hidden bg-neutral-200"
      >
        <div
          style={{
            backgroundImage: `url(${card.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
        ></div>
        <div className="absolute inset-0 z-10 grid place-content-center">
          <p className="bg-gradient-to-br from-white/20 to-white/0 p-8 text-6xl font-black uppercase text-white backdrop-blur-lg">
            {card.title}
          </p>
        </div>
      </div>
    );
  };

  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress: Horizon } = useScroll({
    target: targetRef,
  });

  const x = useTransform(Horizon, [0, 1], ["1%", "-95%"]);

  return (
    <article ref={targetRef} className="relative h-[300vh] mb-[22vw]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </article>
  );
}
