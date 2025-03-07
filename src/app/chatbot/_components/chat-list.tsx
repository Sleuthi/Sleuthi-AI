"use client";

import { InitiatePredictionResponse } from "@/app/types";
import { ChatMessage } from "@/data/schemas/dto";
import {
  Fragment,
  use,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import ChatItem from "./chat-item";
import { choco, hawk, river, useCharacterStore } from "@/store/character-store";
import { FAQ_OPTIONS } from "@/data/config";
import { cn } from "@/lib/utils";

const chatBgColor = {
  [hawk.name]: "bg-[#FFAFEC]",
  [choco.name]: "bg-[#5DD9C1]",
  [river.name]: "bg-[#FFC75F]",
};

interface ChatListProps {
  walletAddress: string;
  firstAskQuestion: Promise<InitiatePredictionResponse>;
  errorMessage: string | null;
  quickSelect: string | null;
  setQuickSelect: (value: string) => void;
  isLoadingChat: boolean;
  setIsLoadingChat: (value: boolean) => void;
}

export default function ChatList({
  walletAddress,
  firstAskQuestion,
  errorMessage,
  quickSelect,
  setQuickSelect,
  setIsLoadingChat,
}: ChatListProps) {
  const firstAskQuestionResponse = use(firstAskQuestion);
  const { character } = useCharacterStore();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const finishRef = useRef<HTMLDivElement | null>(null);

  const [isPending, startTransition] = useTransition();

  const [messages, setMessages] = useState<ChatMessage[]>([
    ...(firstAskQuestionResponse
      ? [
          {
            role: "apiMessage",
            content: firstAskQuestionResponse?.text,
            error: false,
            timestamp: new Date(),
          } as ChatMessage,
        ]
      : []),
  ]);

  const handleSubmit = async (messageOverride?: string) => {
    const messageToSubmit = messageOverride || "";

    setMessages((prev) => [
      ...prev,
      {
        role: "userMessage",
        content: messageToSubmit,
        error: false,
        timestamp: new Date(),
      },
    ]);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "apiMessage",
          content: "Thinking...",
          error: false,
          timestamp: new Date(),
        },
      ]);
    }, 200);

    startTransition(async () => {
      try {
        if (!walletAddress) return;

        const response = await fetch("api/ask-question", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: messageToSubmit,
            character: character.name,
            walletAddress,
            sessionId: firstAskQuestionResponse.sessionId,
            history: messages.slice(-4).map((message) => ({
              role: message.role,
              content: message.content,
            })),
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch response");
        }

        const reader = response.body?.getReader();
        if (!reader) {
          return;
        }

        const decoder = new TextDecoder();
        let data = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }
          const decodedChunk = decoder.decode(value);
          data += decodedChunk;

          setMessages((prev) => [
            ...prev.slice(0, -1),
            {
              role: "apiMessage",
              content: data,
              error: false,
              timestamp: new Date(),
            },
          ]);
        }
      } catch (error) {
        setMessages((prev) => [
          ...prev.slice(0, -1),
          {
            role: "apiMessage",
            content: "Sorry, Sleuthi AI is busy. Please try again.",
            error: true,
            timestamp: new Date(),
          },
        ]);
      } finally {
        setTimeout(() => {
          inputRef.current?.focus();
        }, 100);
      }
    });
  };

  useEffect(() => {
    finishRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [walletAddress]);

  useEffect(() => {
    if (errorMessage) {
      setMessages([
        {
          role: "apiMessage",
          content: errorMessage,
          error: true,
          timestamp: new Date(),
        },
      ]);
    }
  }, [errorMessage, walletAddress]);

  useEffect(() => {
    if (quickSelect) {
      handleSubmit(quickSelect);
    }

    setQuickSelect("");
  }, [quickSelect]);

  useEffect(() => {
    if (isPending) {
      setIsLoadingChat(true);
    } else {
      setIsLoadingChat(false);
    }
  }, [isPending]);

  return (
    <div className="h-[calc(100%-200px)] w-full md:h-[calc(100%-12vw)]">
      <div className="h-full w-full overflow-y-hidden">
        <div className="h-full overflow-y-auto px-4 pb-[4vw] md:px-[1.6vw]">
          <div className="flex flex-col gap-2 py-4 md:gap-[1.2vw] md:py-[1.6vw]">
            {messages?.map((item, index) => (
              <Fragment key={index}>
                <ChatItem item={item} isPending={isPending} />
                {item?.role === "apiMessage" &&
                  index === 0 &&
                  walletAddress && (
                    <div className="flex max-w-full flex-col gap-2">
                      {FAQ_OPTIONS?.map((option, idx) => (
                        <button
                          className={cn(
                            "rounded-full border border-black bg-transparent px-2 py-2 transition-all hover:brightness-75 md:max-w-[80%] md:px-[1.6vw] md:py-[0.6vw]",
                            chatBgColor[character.name],
                          )}
                          onClick={() => setQuickSelect(option)}
                          disabled={isPending}
                          key={idx}
                        >
                          <p className="font-sora max-w-none text-wrap text-left text-sm leading-7 text-black md:text-[1.2vw]">
                            {option}
                          </p>
                        </button>
                      ))}
                    </div>
                  )}
              </Fragment>
            ))}
          </div>
          <div ref={finishRef} />
        </div>
      </div>
    </div>
  );
}
