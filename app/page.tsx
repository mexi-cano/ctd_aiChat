"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import Assessment from "./components/Views/Assessment";
import Explain from "./components/Views/Explain";
import Toggle from "./components/Switch";
import fetchEvaluation from "./fetchCalls/fetchEvaluation";
import { EvaluationResponse } from "./types/EvaluationResponse";
import { CompletionMessage } from "./types/CompletionMessage";
import { systemPrompt } from "./variables/openai";

export default function Home() {
  const [enabled, setEnabled] = useState(false)
  const [userInput, setUserInput] = useState<string>("");
  const [codeAttempt, setCodeAttempt] = useState<string>("// code here");

  const [chatHistory, setChatHistory] = useState<CompletionMessage[]>([
    { role: "system", content: systemPrompt },
  ]);

  const [hintApiResponse, setHintApiResponse] = useState<EvaluationResponse>({
    result: null,
    hint: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isQuestion, setIsQuestion] = useState<boolean>(false);

  const toggleEnabled = () => {
    setEnabled(prev => !prev);
  };
  
  const handleToggleChange = () => {
    toggleEnabled();
  };

  const handleUserInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(e.target.value);
  };

  function handleEditorChange(value: any) {
    setCodeAttempt(value);
  }

  const handlePracticeQuestion = async () => {
    setIsLoading(true);

    const messages = [
      ...chatHistory,
      { role: "user", content: "ask me a similar question, no code block" },
    ];

    try {
      await fetchEvaluation(messages).then((data) => {
        setChatHistory([
          ...messages,
          { role: "assistant", content: `${data.message}` },
        ]);

        setHintApiResponse({
          result: null,
          hint: "",
          practiceQuestion: data.message,
        });

        setUserInput("");
        setCodeAttempt("// code here");
        setIsQuestion(true);
        setIsLoading(false);
      });
    } catch {
      throw new Error("something went wrong");
    }
  };

  const handleSessionRestart = () => {
    setUserInput("");
    setCodeAttempt("// code here");
    setChatHistory([{ role: "system", content: systemPrompt }]);
    setHintApiResponse({
      result: null,
      hint: "",
      practiceQuestion: "",
    });
    setIsQuestion(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const messages = [
      ...chatHistory,
      { role: "user", content: `${codeAttempt + `\n ` + userInput}` },
    ];

    try {
      await fetchEvaluation(messages).then((data) => {
        setChatHistory([
          ...messages,
          { role: "assistant", content: `${data.message}` },
        ]);

        const hintResponse = JSON.parse(data.message);
        console.log(hintResponse);

        setHintApiResponse({
          result: hintResponse.result,
          hint: hintResponse.hint,
        });

        setUserInput("");
        setIsQuestion(false);
        setIsLoading(false);
      });
    } catch {
      throw new Error("something went wrong");
    }
  };

  return (
    <main className="flex h-screen flex-col justify-center items-center p-4 m-auto max-w-screen-2xl">
      <Toggle 
        id="toggle"
        label="Switch to analyzing function"
        checked={enabled}
        onChange={handleToggleChange} 
      />
      {enabled ? (
         <Explain
          codeAttempt={codeAttempt}
          handleEditorChange={handleEditorChange}
          userInput={userInput}
          handleUserInput={handleUserInput}
          handleSubmit={handleSubmit}
          hintApiResponse={hintApiResponse}
          handleSessionRestart={handleSessionRestart}
          isQuestion={isQuestion}
          handlePracticeQuestion={handlePracticeQuestion} />
      ) : (
        <Assessment
          codeAttempt={codeAttempt}
          handleEditorChange={handleEditorChange}
          userInput={userInput}
          handleUserInput={handleUserInput}
          handleSubmit={handleSubmit}
          hintApiResponse={hintApiResponse}
          handleSessionRestart={handleSessionRestart}
          isQuestion={isQuestion}
          handlePracticeQuestion={handlePracticeQuestion} />
      )}
    </main>
  );
}
