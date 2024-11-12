import {
  parseAbsoluteToLocal,
  toCalendarDate,
  ZonedDateTime,
} from "@internationalized/date";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Block {
  title: String;
  duration: String;
  start: Date;
  history: History[];
}

export interface History {
  date: String;
  start: Date;
  end?: Date;
}

interface BlockStoreProps {
  blocks: Block[];
  createBlock: (block: Block) => { success: boolean; message: string };
  deleteBlock: (block: Block) => void;
  updateBlock: (block: Block) => void;
  startBlock: (block: Block) => void;
  endBlock: (block: Block) => void;
}

export const useStore = create<BlockStoreProps>()(
  persist(
    (set, get) => ({
      blocks: [],
      createBlock: (block) => {
        const { blocks } = get();
        if (!blocks.find((e) => e.title === block.title)) {
          set(({ blocks }) => ({
            blocks: [...blocks, block],
          }));
          return { success: true, message: "Created block" };
        }
        return { success: false, message: "Block with name already exists" };
      },
      deleteBlock: (block) => {
        set(({ blocks }) => ({
          blocks: blocks.filter((item) => item.title !== block.title),
        }));
      },
      updateBlock: (block) => {},
      startBlock: (block) => {
        const { blocks } = get();
        const date = parseAbsoluteToLocal(new Date().toISOString());
        const parsedDate =
          String(date.year) +
          "-" +
          String(date.month).padStart(2, "0") +
          "-" +
          String(date.day).padStart(2, "0");

        console.log(parsedDate);
        const selectedBlock = blocks.find((e) => e.title === block.title);
        selectedBlock?.history.push({ date: parsedDate, start: new Date() });

        const modifiedBlocks = blocks.map((e) =>
          e.title === selectedBlock?.title ? selectedBlock : e,
        );

        set(({ blocks }) => ({
          blocks: modifiedBlocks,
        }));
      },
      endBlock: (block) => {
        const { blocks } = get();
        const date = parseAbsoluteToLocal(new Date().toISOString());
        const parsedDate =
          String(date.year) +
          "-" +
          String(date.month).padStart(2, "0") +
          "-" +
          String(date.day).padStart(2, "0");

        console.log(parsedDate);
        const selectedBlock = blocks.find((e) => e.title === block.title);
        const modifiedHistory = {
          ...selectedBlock?.history.find((e) => e.date === parsedDate),
          end: new Date(),
        };
        const modifiedHistories = selectedBlock?.history.map((e) =>
          e.date === modifiedHistory.date ? modifiedHistory : e,
        );
        const modifiedBlock = { ...selectedBlock, history: modifiedHistories };
        const modifiedBlocks = blocks.map((e) =>
          e.title === modifiedBlock.title ? modifiedBlock : e,
        );
        //@ts-ignore
        set(() => ({
          blocks: modifiedBlocks,
        }));
      },
    }),
    { name: "blocks" },
  ),
);
