"use client";

import { choco, hawk, river, useCharacterStore } from "@/store/character-store";
import { cn } from "@/utils/classname";
import Image from "next/image";

export const Section2 = () => {
  const { character } = useCharacterStore();

  const getAssetPath = (
    type: "item" | "pattern",
    id?: number,
    side?: "left" | "right",
  ) => {
    const base = `/assets/homepage/section-2`;
    const suffix = character.name.toLowerCase();

    if (type === "item") {
      return `${base}/item-${id}-${suffix}.png`;
    }
    return `${base}/pattern-${side}-${suffix}.png`;
  };

  const getBgColor = (type: "header" | "card") => {
    const colors = {
      header: {
        [hawk.name]: "bg-[#FFAFEC]",
        [choco.name]: "bg-[#5DD9C1]",
        [river.name]: "bg-[#FFC75F]",
      },
      card: {
        [hawk.name]: "bg-[#F7F6F2]",
        [choco.name]: "bg-[#FFF8E1]",
        [river.name]: "bg-[#F4EEFF]",
      },
    };
    return colors[type][character.name] || colors[type][hawk.name];
  };

  const ServiceCard = ({
    id,
    title,
    subtitle,
    assetSrc,
  }: {
    id: number;
    title: string;
    subtitle: string;
    assetSrc: string;
  }) => (
    <div
      className={cn(
        "flex h-full flex-row items-center rounded-3xl border-[0.25vw] border-black px-[4vw] py-[3vw] md:flex-col md:justify-between md:px-[2vw] md:py-[1.5vw]",
        getBgColor("card"),
      )}
    >
      <Image
        src={assetSrc}
        width={480}
        height={480}
        alt=""
        className="mb-[2vw] mr-[4vw] h-auto w-[15vw] md:mr-0"
        priority
      />

      <div className="flex w-full flex-col">
        <p
          className="mb-[1vw] font-avigea text-lg text-black md:text-center md:text-[2vw]"
          style={{ lineHeight: 1 }}
        >
          {title}
        </p>

        <p
          className="font-inter text-[8px] text-black md:text-center md:text-[1vw]"
          style={{ lineHeight: 1 }}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );

  const ServiceCard2 = ({
    id,
    title,
    subtitle,
    assetSrc,
  }: {
    id: number;
    title: string;
    subtitle: string;
    assetSrc: string;
  }) => (
    <div
      className={cn(
        "flex h-full items-center rounded-3xl border-[0.25vw] border-black px-[4vw] py-[3vw] md:px-[2vw] md:py-[1.5vw]",
        getBgColor("card"),
      )}
    >
      <Image
        src={assetSrc}
        width={480}
        height={480}
        alt=""
        className="mr-[4vw] h-auto w-[14vw] md:mr-[1vw]"
        priority
      />

      <div className="flex w-full flex-col">
        <p
          className="mb-[2vw] font-avigea text-lg text-black md:text-[2vw]"
          style={{ lineHeight: 1 }}
        >
          {title}
        </p>

        <p
          className="font-inter text-[8px] text-black md:text-[1vw]"
          style={{ lineHeight: 1 }}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );

  return (
    <section className="flex h-full w-full justify-center bg-black pb-[4vw]">
      <div className="flex flex-col items-center">
        <div className={cn("flex h-full w-full", getBgColor("header"))}>
          <Image
            src={getAssetPath("pattern", undefined, "left")}
            width={480}
            height={480}
            alt=""
            className="h-auto w-[35vw]"
          />

          <div className="flex w-[30vw] justify-center">
            <p
              className="mt-[3vw] text-center font-avigea text-[5vw] text-black"
              style={{ lineHeight: 1 }}
            >
              Tek Services
            </p>
          </div>

          <Image
            src={getAssetPath("pattern", undefined, "right")}
            width={480}
            height={480}
            alt=""
            className="h-auto w-[35vw]"
          />
        </div>

        <div className="-mt-[14vw] mb-[2vw] grid w-[80vw] grid-cols-1 gap-x-[2vw] gap-y-[2vw] md:grid-cols-3">
          <ServiceCard
            key={1}
            id={1}
            assetSrc="/assets/homepage/section-2/item-1.png"
            title="ADAPTIVE NEURAL PERSONALITY"
            subtitle="Sleuthi intuitively adapts to user behavior, blending sharp market analysis, strategic insights, and a touch of playful wit."
          />
          <ServiceCard
            key={2}
            id={2}
            assetSrc="/assets/homepage/section-2/item-2.png"
            title="ELITE MARKET INTELLIGENCE"
            subtitle="Sleuthi delivers real time, data driven market insights, empowering precise and confident trading decisions."
          />
          <ServiceCard
            key={3}
            id={3}
            assetSrc="/assets/homepage/section-2/item-3.png"
            title="DYNAMIC TICKER DATA AGGREGATION"
            subtitle="Sleuthi compiles data from top-tier sources. X, Discord Alpha, and leading Telegram bots."
          />
        </div>

        <div className="grid w-[80vw] grid-cols-1 gap-x-[2vw] gap-y-[2vw] md:grid-cols-2">
          <ServiceCard2
            key={4}
            id={4}
            assetSrc="/assets/homepage/section-2/item-4.png"
            title="RETROSPECTIVE TRADE ANALYSIS"
            subtitle="Sleuthi deciphers blockchain data to pinpoint trading missteps, assess performance, and refine strategies with accuracy."
          />
          <ServiceCard2
            key={5}
            id={5}
            assetSrc="/assets/homepage/section-2/item-5.png"
            title="REKT & FUMBLE QUANT"
            subtitle="Sleuthi analyzes blockchain patterns to uncover mistakes, mitigate risks, and optimize future trades with precision."
          />
        </div>
      </div>
    </section>
  );
};
