"use client";
import Webcam from "react-webcam";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic } from "lucide-react";

function RecordAnswerSection() {
  const [userAnswer, setUserAnswer] = useState("");
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    results.map((result) =>
      setUserAnswer((prevAnswer) => prevAnswer + result?.transcript)
    );
  }, [results]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5">
        <Image
          src={"/webcam.png"}
          width={200}
          height={200}
          className="absolute"
        />

        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: "100%",
            zIndex: 10,
          }}
        />
      </div>

      <Button
        variant="outline"
        className={`my-10 ${isRecording ? "bg-secondary" : "bg-green-400"}`}
        onClick={isRecording ? stopSpeechToText : startSpeechToText}
      >
        {isRecording ? (
          <h2 className="flex gap-2 text-red-600">
            <Mic />
            Stop Recording
          </h2>
        ) : (
          "Record Answer"
        )}
      </Button>

      <Button
        onClick={() => {
          console.log(userAnswer);
        }}
      >
        Show User Answer
      </Button>
    </div>
  );
}

export default RecordAnswerSection;
