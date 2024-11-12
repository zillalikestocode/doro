"use client";

import { useStore } from "@/config/store";
import { Button } from "@nextui-org/button";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { GeistMono } from "geist/font/mono";

export default function BlockPage({
  params: { block },
}: {
  params: { block: string };
}) {
  const { blocks, startBlock } = useStore();
  const parsedBlock = block.replace("_", " ");
  if (!blocks.find((item) => item.title === parsedBlock)) {
    return notFound();
  }

  const [selectedBlock, setBlock] = useState(
    blocks.find((item) => item.title === parsedBlock),
  );
  const [time, setTime] = useState(Number(selectedBlock?.duration) * 3600);

  const [isActive, setActive] = useState(false);

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  // useEffect to run the countdown
  useEffect(() => {
    let interval: any = null;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      clearInterval(interval!);
    }

    return () => clearInterval(interval!); // Cleanup interval on unmount
  }, [isActive, time]);

  return (
    <div className="flex flex-col items-center justify-center">
      <h4 className="font-semibold text-4xl tracking-[-0.04em]">
        {selectedBlock?.title}
      </h4>
      <div className="flex items-center flex-col gap-5 mt-7">
        <h4 style={GeistMono.style} className="font-medium text-8xl">
          {formatTime(time)}
        </h4>
        <Button
          isDisabled={isActive}
          className="w-full font-semibold"
          onClick={() => {
            setActive(true);
            startBlock(selectedBlock!);
          }}
          color="primary"
        >
          start
        </Button>
      </div>
    </div>
  );
}
