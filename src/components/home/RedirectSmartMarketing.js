"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RedirectSmartMarketing() {
  const router = useRouter();
  useEffect(() => {
    router.push("https://www.i1smartmarketing.com");
  }, [router]);
  return null;
}
