"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { MockInterview } from "@/utils/schema";
import { desc, eq } from "drizzle-orm";
import { db } from "@/utils/db";
import InterviewItemCard from "./InterviewItemCard";

function InterviewList() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);

  useEffect(() => {
    user && GetInterviewList();
  }, [user]);

  const GetInterviewList = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(
        eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress)
      )
      .orderBy(desc(MockInterview.id));

    setInterviewList(result);
  };

  return (
    <div>
      <h2 className="font-bold text-xl">Previous Mock Interviews</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
        {interviewList &&
          interviewList.map((interview, index) => (
            <InterviewItemCard key={index} interview={interview} />
          ))}
      </div>
    </div>
  );
}

export default InterviewList;
