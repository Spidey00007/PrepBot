import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

function QuestionsSection({ mockInterviewQuestion, activeQuestionIndex }) {
  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, Your browser does not support text to speech");
    }
  };

  return (
    mockInterviewQuestion && (
      <div className="p-5 border rounded-lg my-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {mockInterviewQuestion &&
            mockInterviewQuestion.map((QuestionsSection, index) => (
              <h2
                className={`p-2 border rounded-full
              text-xs md:text-sm text-center cursor-pointer
              ${activeQuestionIndex == index && "bg-primary text-white"}`}
              >
                Question {index + 1}
              </h2>
            ))}
        </div>

        <h2 className="my-5 text-md md:text-lg">
          {mockInterviewQuestion[activeQuestionIndex]?.question}
        </h2>

        <Volume2
          className="cursor-pointer"
          onClick={() =>
            textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)
          }
        />

        <div className="border rounded-lg p-3 bg-purple-100 mt-20">
          <h2 className="flex gap-2 items-center text-primary">
            <Lightbulb />
            <strong>Information</strong>
          </h2>
          <h2 className="my-2 text-sm text-primary">
            Enable Video Web Cam and Microphone to Start your AI Generated Mock
            Interview. It Has 5 questions which you can answer and at the last
            you will get the report on the basis of your answer.
          </h2>
          <h2 className="mt-3 text-red-500">
            <strong>Note</strong>
          </h2>
          <h2 className="text-sm text-red-400">
            We never record your video. You can disable Web cam access at any
            time if you want.
          </h2>
        </div>
      </div>
    )
  );
}

export default QuestionsSection;
