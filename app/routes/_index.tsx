import type { MetaFunction } from "@remix-run/node";
import Cursor from "~/component/cursor";
import DustySnow from "~/component/dustySnow";
import Github from "~/component/github";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="h-full relative">
      <DustySnow />
      <Cursor />
      <article className="my-gradient fixed w-screen pointer-events-none" />
      <section className="min-h-screen flex flex-col justify-between">
        <div>
          <div className="text-center">
            <h1 className="text-[18vw] font-bold leading-[0.9]">Marmot</h1>
          </div>
          <span className="flex flex-col text-end grid-cols-[2/-1] mt-[2.1vw]">
            <p className="font-[900] uppercase leading-[100%] text-[5.3vw] tracking-[0.1em]">
              Scroll animate
            </p>
            <p className="text-[rgb(176,176,176)] text-[3.2vw] font-[600] uppercase">
              © 2024 HappyMarmot
            </p>
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
            <p className="font-[600] tracking-[-0.01em] uppercase">
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
    </div>
  );
}
