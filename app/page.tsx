import Blocks from "@/components/blocks";
import CreateBlock from "@/components/create_block";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <CreateBlock />
      <div className="mt-10 space-y-2.5">
        <h4 className="tracking-[-0.04em] text-2xl font-semibold text-center">
          your time blocks
        </h4>
        <Blocks />
      </div>
    </section>
  );
}
