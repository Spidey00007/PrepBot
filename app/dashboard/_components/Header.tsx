"use client";
import React from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Header() {
  const path = usePathname();
  const router = useRouter();

  return (
    <div className="flex p-3 items-center bg-secondary justify-between shadow-sm">
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
        <Link href={"/dashboard"}>
          <Button>Get Started</Button>
        </Link>
        <UserButton />
      </div>
    </div>
  );
}

export default Header;
