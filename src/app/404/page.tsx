"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <>
      <main
        className="flex justify-center items-center"
        style={{ height: "100vh" }}
      >
        <div className="container text-center">
          <span className="font-bold text-5xl text-stone-800">
            Sorry, the content you're searching for cannot be found!
          </span>
          <button
            className="bg-blue-900 p-2 rounded m-10"
            onClick={() => {
              router.push("/");
            }}
          >
            <span className="text-yellow-500 font-semibold">
              Back to Pokedex
            </span>
          </button>
        </div>
      </main>
    </>
  );
}
