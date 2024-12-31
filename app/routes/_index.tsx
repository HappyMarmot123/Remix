import type { MetaFunction } from "@remix-run/node";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useAnimationFrame, useVelocity, Variants } from "motion/react";
import { wrap } from "motion";
import { useMotionValue } from "motion/react";
import { useRef } from "react";
import Cursor from "~/component/cursor";
import DustySnow from "~/component/dustySnow";
import Github from "~/component/github";
import Text from "~/text";
import Horizontal from "~/horizontal";

interface ParallaxProps {
  children: string;
  baseVelocity: number;
}
export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll();
  const { scrollYProgress: scrollYProgress2 } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const customColor = useTransform(
    scrollYProgress,
    [0, 1],
    ["#ff98a2", "#00f"]
  );

  function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {
    const baseX = useMotionValue(0);
    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
    const directionFactor = useRef<number>(1);
    // Scroll to Swap
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
      damping: 50,
      stiffness: 400,
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
      clamp: false,
    });

    useAnimationFrame((t, delta) => {
      let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
      // Scroll to Swap
      if (velocityFactor.get() < 0) {
        directionFactor.current = -1;
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1;
      }
      moveBy += directionFactor.current * moveBy * velocityFactor.get();
      // Scroll to Swap
      baseX.set(baseX.get() + moveBy);
    });

    return (
      <div className="parallax">
        <motion.div className="scroller" style={{ x }}>
          <span className="text-[white] text-[10vw]">{children} </span>
          <span className="text-[white] text-[10vw]">{children} </span>
          <span className="text-[white] text-[10vw]">{children} </span>
          <span className="text-[white] text-[10vw]">{children} </span>
        </motion.div>
      </div>
    );
  }

  const cardVariants: Variants = {
    offscreen: {
      y: 200, // 300에서 200으로 변경하여 더 위쪽에서 시작하도록 함
    },
    onscreen: {
      y: 0, // 50에서 30으로 변경하여 최종 위치도 위로 조정
      rotate: -10,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };

  return (
    <>
      <motion.div className="progress-bar" style={{ scaleX: scaleX }} />
      <figure className="progress">
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="30" pathLength="1" className="bg" />
          <motion.circle
            cx="50"
            cy="50"
            r="30"
            pathLength="1"
            className="indicator"
            style={{
              pathLength: scrollYProgress2,
              transition: "pathLength 0.3s ease",
              stroke: customColor,
            }}
          />
        </svg>
      </figure>
      <div ref={ref} className="h-full relative">
        <DustySnow />
        <Cursor />
        <article className="my-gradient fixed w-screen pointer-events-none" />
        <section className="min-h-screen h-fit flex flex-col justify-between mb-[22vw]">
          <div>
            <div className="text-center">
              <h1 className="text-[18vw] font-bold leading-[0.9]">Marmot</h1>
            </div>
            <span className="flex flex-col text-end grid-cols-[2/-1] mt-[2.1vw]">
              <motion.p
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="font-[900] uppercase leading-[100%] text-[5.3vw] tracking-[0.1em]"
              >
                Scroll animate
              </motion.p>
              <motion.p
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-[rgb(176,176,176)] text-[3.2vw] font-[600] uppercase"
              >
                © 2024 HappyMarmot
              </motion.p>
            </span>
          </div>
          <div className="grid grid-cols-[1fr_2fr_4fr] items-center justify-between leading-[0.9] px-[2vw] h-[12vw]">
            <div className="text-left">
              <p className="font-[900]">scroll to</p>
              <p className="font-[900]">explore</p>
            </div>
            <div className="text-left">
              <p className="font-[600] tracking-[-0.01em] uppercase">
                Smooth Scroll
              </p>
              <p className="font-[600] tracking-[-0.01em] uppercase">
                Framer Motion Animate
              </p>
              <p className="text-[clamp(2.5rem,6vw,4.5rem)] font-[600] tracking-[-0.01em] uppercase">
                Website designed by Happy marmot 123
              </p>
            </div>
            <div className="text-end">
              <Github />
            </div>
          </div>
          {/* <div>
          <p className="font-[600] tracking-[-0.01em] uppercase text-[max(16px,3.7333333333vw)]">
            Smooth Scroll
          </p>
          <p className="font-[600] tracking-[-0.01em] uppercase text-[max(16px,3.7333333333vw)]">
            Framer Motion Animate
          </p>
          <p className="font-[600] tracking-[-0.01em] uppercase text-[max(16px,3.7333333333vw)]">
            Website designed by Happy marmot 123
          </p>
        </div> */}
        </section>
        <section className="min-[50vw] h-fit flex flex-col justify-between mb-[22vw]">
          <ParallaxText baseVelocity={-2}>Framer Motion</ParallaxText>
          <ParallaxText baseVelocity={2}>HappyMarmot123____</ParallaxText>
        </section>
        <section className="min-h-screen h-fit flex flex-col justify-between mb-[22vw]">
          <div className="w-screen h-[200vh] grid grid-cols-12 gap-[1.6vw]">
            <motion.div
              className="sticky top-[33%] self-start border-l-[4px] border-l-pink-300 col-[3/span_4] px-[2.2vw] py-[1.6vw]"
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ amount: 0.8 }}
            >
              <motion.p
                className="text-[5vw] text-white uppercase font-bold leading-[0.9]"
                variants={cardVariants}
              >
                why framer motion?
              </motion.p>
            </motion.div>
            <aside className="max-w-[40vw] col-[7/-1] mt-[14vw] flex flex-col justify-between py-[5vw]">
              {[...Array(5)].map((_, index) => (
                <>
                  <Text key={index} />
                </>
              ))}
            </aside>
          </div>
        </section>
        <section>
          <Horizontal />
        </section>
      </div>
    </>
  );
}
