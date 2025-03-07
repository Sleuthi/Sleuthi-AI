"use client";

import { choco, hawk, river, useCharacterStore } from "@/store/character-store";
import { cn } from "@/utils/classname";
import Image from "next/image";
import Link from "next/link";

export const Section1 = () => {
  const { character, setCharacter } = useCharacterStore();

  const characterTransitions = {
    [hawk.name]: {
      next: choco,
      nextTwo: river,
      chatOne: "choco",
      chatTwo: "river",
    },
    [choco.name]: {
      next: hawk,
      nextTwo: river,
      chatOne: "hawk",
      chatTwo: "river",
    },
    [river.name]: {
      next: choco,
      nextTwo: hawk,
      chatOne: "choco",
      chatTwo: "hawk",
    },
  };

  const defaultTransition = {
    next: choco,
    nextTwo: river,
    chatOne: "choco",
    chatTwo: "river",
  };

  const getTransition = () =>
    characterTransitions[character.name] || defaultTransition;

  const getNextOneChar = () =>
    `/assets/characters/chat-${getTransition().chatOne}.png`;
  const getNextTwoChar = () =>
    `/assets/characters/chat-${getTransition().chatTwo}.png`;

  const nextOneCharClicked = () => setCharacter(getTransition().next);
  const nextTwoCharClicked = () => setCharacter(getTransition().nextTwo);

  const bgChat = {
    [hawk.name]: "/assets/characters/btn-chat-hawk.png",
    [choco.name]: "/assets/characters/btn-chat-choco.png",
    [river.name]: "/assets/characters/btn-chat-river.png",
  };

  const heroAsset = {
    [hawk.name]: "/assets/characters/hawk.gif",
    [choco.name]: "/assets/characters/choco.gif",
    [river.name]: "/assets/characters/river.gif",
  };

  const heroGreeting = {
    [hawk.name]: "Move fast. Move precise. I'm Hawk.",
    [choco.name]: "Gm, I'm Choco, What's on your mind?",
    [river.name]: "Sup, name's River!",
  };

  return (
    <section
      className={cn(
        `flex h-full w-full justify-center overflow-hidden py-[10%]`,
      )}
    >
      <div className="relative flex h-full w-[90vw] flex-col items-center md:flex-row">
        <p className="absolute -left-[2.5vw] -top-[2vw] -rotate-[25deg] font-arkipelago text-[3vw] text-black">
          Whats up...
        </p>

        <Image
          src={"/assets/homepage/section-1/icon-star.png"}
          width={480}
          height={480}
          alt=""
          className="absolute -right-[3.5vw] -top-[3vw] hidden h-auto w-[8vw] md:block"
          priority
        />

        <div className="z-50 flex h-full w-[80vw] flex-col justify-between pt-[4vw] md:w-[60%]">
          <div className="flex w-full flex-col">
            <p
              className="font-avigea text-5xl text-black md:text-[6vw]"
              style={{ lineHeight: 1 }}
            >
              Every Transaction
              <br />
              Tells a Story.
            </p>
            <p
              className="mb-[2vw] w-[80%] font-inter text-xs text-black md:text-[1.5vw]"
              style={{ lineHeight: 1.2 }}
            >
              {heroGreeting[character.name]}
            </p>
          </div>

          <div className="flex items-center">
            <Link href={"/chatbot"}>
              <Image
                src={bgChat[character.name]}
                width={480}
                height={480}
                alt=""
                className="h-auto w-[15vw] hover:animate-shake"
              />
              {/* <div
                className={cn(
                  "rounded-full border-[0.25vw] border-black px-[1.5vw] py-[1vw] hover:animate-shake",
                  bgColorMap[character.name],
                )}
              >
                <p className="font-inter text-[2vw] text-black">{`Chat ${character.name}`}</p>
              </div> */}
            </Link>
            <div className="w-[2vw] border-[0.25vw] border-b border-black" />
            <Image
              src={getNextOneChar()}
              width={480}
              height={480}
              alt=""
              className="h-auto w-[6vw] cursor-pointer"
              onClick={nextOneCharClicked}
            />
            <div className="w-[2vw] border-[0.25vw] border-b border-black" />
            <Image
              src={getNextTwoChar()}
              width={480}
              height={480}
              alt=""
              className="h-auto w-[6vw] cursor-pointer"
              onClick={nextTwoCharClicked}
            />
          </div>
        </div>

        <div className="z-40 mt-[5vh] h-full w-[40%] md:mt-0">
          <Image
            src={heroAsset[character.name]}
            width={480}
            height={480}
            alt=""
            className="-mt-[4vw] h-auto w-full scale-[3] md:scale-150"
            priority
          />
        </div>
      </div>
    </section>
  );
};
