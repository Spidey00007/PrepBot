"use client";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronDownCircle, ChevronsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

function Feedback({ params }) {
  useEffect(() => {
    GetFeedback();
  }, []);

  const [feedbackList, setFeedbackList] = useState([]);
  const router = useRouter();
  const { user } = useUser();

  const GetFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);

    setFeedbackList(result);
    console.log(result);
  };

  return (
    <div className="p-10">
      {feedbackList?.length == 0 ? (
        <h2 className="font-bold text-xl text-gray-500">
          No Interview Feedback Record Found
        </h2>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-green-500">
            Congratulations {user?.username || user?.firstName || "Guest"}
          </h2>
          <h2 className="text-2xl font-bold">
            Here is your interview feedback
          </h2>

          <h2 className="text-primary text-lg my-3">
            Your overall interview rating: <strong>7/10</strong>
          </h2>
          <h2 className="text-sm text-gray-500">
            Explore your interview question with the correct answer, your
            response and suggestions for improvement
          </h2>

          {feedbackList &&
            feedbackList.map((item, index) => (
              <Collapsible key={index} className="mt-7">
                <CollapsibleTrigger className="p-2 bg-secondary rounded-lg my-2 text-left flex justify-between gap-7 w-full">
                  {item.question} <ChevronDown />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-red-500 p-2 border rounded-lg">
                      <strong>Rating: </strong>
                      {item.rating}
                    </h2>

                    <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900">
                      <strong>Your Answer: </strong>
                      {item.userAns}
                    </h2>

                    <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900">
                      <strong>Correct Answer: </strong>
                      {item.correctAns}
                    </h2>

                    <h2 className="p-2 border rounded-lg bg-purple-50 text-sm text-purple-900">
                      <strong>Feedback: </strong>
                      {item.feedback}
                    </h2>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
        </>
      )}

      <Button className="mt-4" onClick={() => router.replace("/dashboard")}>Go Home</Button>
    </div>
  );
}

export default Feedback;
