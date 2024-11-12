"use client";
import { Block } from "@/config/store";
import { Card, CardBody } from "@nextui-org/card";
import { ArrowUp, Trash } from "iconsax-react";
import { useStore } from "@/config/store";
import {
  parseAbsoluteToLocal,
  parseZonedDateTime,
  toTime,
} from "@internationalized/date";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import Link from "next/link";

export default function Blocks() {
  const { blocks } = useStore();
  return blocks.length !== 0 ? (
    <div className="grid gap-5 grid-cols-3">
      {blocks.map((item, index) => (
        <BlockCard block={item} key={index} />
      ))}
    </div>
  ) : (
    <div className="flex justify-center items-center">
      <h4 className="text-neutral-500 text-sm">No time blocks yet</h4>
    </div>
  );
}

const BlockCard = ({ block }: { block: Block }) => {
  console.log(block.start);
  const router = useRouter();
  const startDate = parseAbsoluteToLocal(new Date(block.start).toISOString());
  const time = toTime(startDate);
  const end = time.add({ hours: Number(block.duration) });
  const { deleteBlock } = useStore();

  return (
    <Card className="">
      <CardBody className="w-56">
        <div className="flex gap-2.5 items-center">
          <h4>{block.title}</h4>
          <Trash
            onClick={() => deleteBlock(block)}
            className="ml-auto cursor-pointer"
            size={16}
          />
          <Link href={`/${block.title.replace(" ", "_")}`}>
            <ArrowUp className="rotate-45" size={16} />
          </Link>
        </div>
        <div className="flex items-center">
          <h4 className="text-neutral-500 text-sm">
            {time.hour > 12 ? time.hour - 12 : time.hour}:
            {time.minute.toLocaleString().padStart(2, "0")}
            {time.hour > 12 ? "PM" : "AM"} -{" "}
            {end.hour > 12 ? end.hour - 12 : end.hour}:
            {end.minute.toLocaleString().padStart(2, "0")}
            {end.hour > 12 ? "PM" : "AM"}
          </h4>
          <h4 className="text-neutral-500 text-sm ml-auto">
            {block.duration}hrs
          </h4>
        </div>
      </CardBody>
    </Card>
  );
};
