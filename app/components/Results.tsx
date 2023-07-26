import { EvaluationResponse } from "../types/EvaluationResponse";

export interface ResultProps {
  hintApiResponse: EvaluationResponse;
}

export default function Results({ hintApiResponse }: ResultProps) {
  return (
    <div className="flex flex-col w-full h-56 p-2">
      <p className="mb-2 text-lg font-bold">
        Result:{" "}
        {hintApiResponse.result === null
          ? ""
          : hintApiResponse.result
          ? "Pass"
          : "Failed"}
      </p>
      <p className="mb-2 text-lg font-bold">Hint: {hintApiResponse.hint}</p>
    </div>
  );
}
