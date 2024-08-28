import { templates } from "@/data/templates";
import Image from "next/image";
import Link from "next/link";

export default function page() {
  return (
    <div className="flex flex-col justify-start items-center">
      <h1 className="text-4xl my-8">Choose Template</h1>
      <div className="flex flex-row gap-4 mt-8">
        {templates.map((temp) => (
          <div key={temp} className="border-4 border-blue-600 p-2">
            <Link href={`/template/${temp.tempId}`}>
              <Image width="480" height="360" src={temp.thumb} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
