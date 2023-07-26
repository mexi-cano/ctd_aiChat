"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import Editor from "@monaco-editor/react";
import Results from "./components/Results";
import fetchEvaluation from "./fetchCalls/fetchEvaluation";
import { EvaluationResponse } from "./types/EvaluationResponse";
import { CompletionMessage } from "./types/CompletionMessage";
import { systemPrompt } from "./variables/openai";

export default function Home() {
  const [userInput, setUserInput] = useState<string>("");
  const [codeAttempt, setCodeAttempt] = useState<string>("");

  const [chatHistory, setChatHistory] = useState<CompletionMessage[]>([
    { role: "system", content: systemPrompt },
  ]);

  const [hintApiResponse, setHintApiResponse] = useState<EvaluationResponse>({
    result: null,
    hint: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleUserInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(e.target.value);
  };

  function handleEditorChange(value: any) {
    setCodeAttempt(value);
  }

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
        setIsLoading(false);
      });
    } catch {
      throw new Error("something went wrong");
    }
  };

  return (
    <main className="flex h-screen flex-col justify-center items-center p-4 m-auto max-w-screen-2xl">
      <h1 className="mb-2 text-3xl">Function Assessment Tool</h1>
      <p className="mb-2">
        Present a function and it will evaluate its functionality
      </p>

      <Editor
        width="100%"
        height="100%"
        defaultLanguage="javascript"
        theme="vs-dark"
        defaultValue="// code here"
        onChange={handleEditorChange}
      />

      <form
        className="flex flex-row w-full h-20 items-center mt-4"
        onSubmit={handleSubmit}
      >
        <textarea
          className="text-white bg-[#252526] w-full p-2 w-full mr-4"
          placeholder="Any clarifications?"
          value={userInput}
          onChange={handleUserInput}
        />
        <div className="flex items-center justify-center h-20">
          <button
            type="submit"
            className=" border-2 p-4 bg-[#097969] hover:bg-[#0B4D4D] text-white text-xl"
          >
            Evaluate
          </button>
        </div>
      </form>

      <Results hintApiResponse={hintApiResponse} />
    </main>
  );
}
