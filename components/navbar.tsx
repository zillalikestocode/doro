import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex items-center gap-2.5 p-4 justify-center">
      <Link href={"/"} className="font-semibold text-3xl tracking-[-0.04em]">
        doro
      </Link>
    </div>
  );
}
