"use client"; // Error components must be Client Components

import { Button } from "@/components/default";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  const { message } = error;

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="z-50 flex h-screen w-full items-center justify-center backdrop-blur-xl">
      <div className="border border-red-500 bg-red-100 p-5 dark:border-red-700 dark:bg-red-300">
        <h2 className="text-3xl font-bold text-red-800">
          Something went wrong!
        </h2>
        <h5 className="text-2xl text-red-600">{message}</h5>
        <div className="space-x-2 mt-3">
          <Button
            onClick={() => reset()}
          >
            Try again
          </Button>
          <Button onClick={() => router.push("/")}>Home</Button>
        </div>
      </div>
    </div>
  );
}
