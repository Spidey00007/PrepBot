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

function AddNewInterview() {
  const [openDialog, setopenDialog] = useState(false);
  const [JobPosition, setJobPosition] = useState();
  const [JobDescription, setJobDescription] = useState();
  const [JobExperience, setJobExperience] = useState();

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(JobPosition, JobDescription, JobExperience);
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:shadow-md hover:cursor-pointer hover:scale-105 transition-all"
        onClick={() => setopenDialog(true)}
      >
        <h2 className="text-lg text-center">+ Add New</h2>
      </div>
      <Dialog open={openDialog}>
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
                  <Button type="submit">Start Interview</Button>
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
