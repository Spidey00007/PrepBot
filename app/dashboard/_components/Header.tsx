"use client";
import React from "react";
import Image from "next/image";
import { UserButton, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Header() {
  const path = usePathname();
  const router = useRouter();
  const { user, isSignedIn } = useUser();

  return (
    <div className="flex border shadow-lg bg-gradient-to-r from-purple-100 to-blue-100 p-3 items-center justify-between">
      <Image
        className="cursor-pointer"
        onClick={() => router.replace("/")}
        src="/logo.svg"
        height={80}
        width={120}
        alt="logo"
      />
      {/* <ul className="hidden md:flex gap-6">
        <li
          onClick={() => router.replace("/dashboard")}
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
            path === "/dashboard" && "text-primary font-bold"
          }`}
        >
          Dashboard
        </li>
        
        <li
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
            path === "/dashboard/contact" && "text-primary font-bold"
          }`}
        >
          Contact
        </li>
      </ul> */}

      <div className="flex p-4 items-center gap-12">
        {isSignedIn ? (
          <div className="flex items-center gap-5">
            <Button
              variant={"outline"}
              onClick={() => router.replace("/dashboard")}
            >
              Dashboard
            </Button>
            <UserButton />
          </div>
        ) : (
          <Button
            onClick={() => router.replace("/dashboard")}
            className="rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-2 text-lg font-semibold text-white shadow-lg transition-all hover:scale-110 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500"
          >
            Get Started
          </Button>
        )}
      </div>
    </div>
  );
}

export default Header;
