"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "../../../utils/GeminiAIModal";
import { LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/clerk-react";
import moment from "moment";
import { useRouter } from "next/navigation";

function AddNewInterview() {
  const [openDialog, setopenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState();
  const [jobDescription, setJobDescription] = useState();
  const [jobExperience, setJobExperience] = useState();
  const [loding, setLoding] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  const onSubmit = async (e) => {
    setLoding(true);
    e.preventDefault();

    const InputPrompt =
      "JobPostion: " +
      jobPosition +
      ", JobDescription: " +
      jobDescription +
      ", JobExperience: " +
      jobExperience +
      ", give " +
      process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT +
      " questions along with answers in json format";

    try {
      const result = await chatSession.sendMessage(InputPrompt);
      const MockJsonResponse = result.response
        .text()
        .replace("```json", "")
        .replace("```", "");
      setJsonResponse(MockJsonResponse);

      if (MockJsonResponse) {
        const resp = await db
          .insert(MockInterview)
          .values({
            mockId: uuidv4(),
            jsonMockResp: MockJsonResponse,
            jobPosition: jobPosition,
            jobDesc: jobDescription,
            jobExperience: jobExperience,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format("DD-MM-YYYY"),
          })
          .returning({ mockId: MockInterview.mockId });

        if (resp) {
          setopenDialog(false);
          router.push("/dashboard/interview/" + resp[0]?.mockId);
        }
      } else {
        console.log("Error in pushing data to db");
      }
    } catch (e) {
      console.log("Error in generating response from AI" + e);
    }
    setLoding(false);
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:shadow-md hover:cursor-pointer hover:scale-105 transition-all"
        onClick={() => setopenDialog(true)}
      >
        <h2 className="text-lg text-center">+ Add New</h2>
      </div>
      <Dialog
        open={openDialog}
        onOpenChange={(isOpen) => setopenDialog(isOpen)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your interview
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h2>
                    Add detail about your position/role, Job description and
                    years of experience
                  </h2>

                  <div className="mt-7 my-3">
                    <label>Job role / Job position</label>
                    <Input
                      placeholder="Ex. Full Stack Developer"
                      required
                      onChange={(event) => setJobPosition(event.target.value)}
                    ></Input>
                  </div>

                  <div className="mt-7 my-3">
                    <label>Job Description</label>
                    <Textarea
                      placeholder="Ex. React, NodeJs, MySql, etc"
                      required
                      onChange={(event) =>
                        setJobDescription(event.target.value)
                      }
                    ></Textarea>
                  </div>

                  <div className="mt-7 my-3">
                    <label>Years of Experience</label>
                    <Input
                      placeholder="Ex. 3"
                      type="number"
                      max="50"
                      required
                      onChange={(event) => setJobExperience(event.target.value)}
                    ></Input>
                  </div>
                </div>
                <div className="flex justify-end gap-5">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      setopenDialog(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loding}>
                    {loding ? (
                      <>
                        <LoaderCircle className="animate-spin" />
                        Generating from AI
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
