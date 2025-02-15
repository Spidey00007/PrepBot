"use client";
import { Button } from "@/components/ui/button";
import Header from "./dashboard/_components/Header";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div>
      <Header />

      <div className="mx-auto px-4 py-6 lg:flex lg:h-screen bg-[url('/grid.svg')]">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-2xl text-gray-400 font-bold sm:text-5xl">
            Introducing
            <strong className="font-extrabold bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-transparent sm:block">
              MockInterview AI
            </strong>
          </h1>

          <p className="mt-4 text-gray-400 sm:text-xl">
            Your go-to platform for practicing and improving your interview
            skills with AI-generated interviews.
          </p>

          <img
            className="py-3"
            src="/InterviewHome.webp"
            alt="Interview Home"
          />

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button
              onClick={() => router.replace("/dashboard")}
              className="items-center rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-purple-600 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
