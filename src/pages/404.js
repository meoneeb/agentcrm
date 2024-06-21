import Image from "next/image";
import { fontBold } from "@/app/layout";
export default function Custom404() {
  return (
    <div className="flex justify-center flex-col items-center w-screen h-screen gap-2">
      <div className="flex justify-center flex-col items-center gap-2">
        <p
          className={`${fontBold.className} md:text-4xl text-2xl text-slate-200 animate-pulse`}
        >
          404
        </p>
        <p className="text-slate-200">page not found</p>
        <a
          href="/"
          className="font-mono text-emerald-400 text-sm hover:underline underline-offset-2"
        >
          home
        </a>
      </div>
      <Image
        src="/logo.svg"
        alt="Figics Logo"
        width={1800}
        height={400}
        className="fixed bottom-0 -right-60 -z-1 opacity-5"
        priority
      />
    </div>
  );
}
