"use client";

import { Block, useStore } from "@/config/store";
import { parseAbsoluteToLocal } from "@internationalized/date";
import { Button } from "@nextui-org/button";
import { TimeInput } from "@nextui-org/date-input";
import { Input } from "@nextui-org/input";
import { I3Dcube } from "iconsax-react";
import { useState, FormEvent } from "react";

export default function CreateBlock() {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState(
    parseAbsoluteToLocal(new Date().toISOString())
  );
  const [duration, setDuration] = useState("");
  const [error, setError] = useState("");

  const { createBlock } = useStore();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { message, success } = createBlock({
      title,
      start: start.toDate(),
      duration,
      history: [],
    });

    if (success) {
      setTitle("");
      // setStart();
      setDuration("");
    } else {
      setError(message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center gap-2.5 w-72 flex-col">
        <h4 className="font-semibold text-neutral-500">Create Time Block</h4>
        <Input
          value={title}
          onValueChange={setTitle}
          label="Block title"
          startContent={<I3Dcube />}
        />
        <div className="grid grid-cols-2 gap-2.5">
          <TimeInput value={start} onChange={setStart} label="Start Time" />
          <Input
            type="number"
            value={duration}
            onValueChange={setDuration}
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-neutral-500 text-small">hours</span>
              </div>
            }
            label="Duration"
          />
        </div>
        <Button
          type="submit"
          isDisabled={!title || !start || !duration}
          className="w-full"
          color="primary"
        >
          create block
        </Button>
        <h4 className="text-danger text-sm">{error}</h4>
      </div>
    </form>
  );
}
