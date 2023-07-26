import { CompletionMessage } from "../types/CompletionMessage";

export default async function fetchEvaluation(messages: CompletionMessage[]) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(messages),
  });

  const data = await res.json();
  return data;
}
