import { EvaluationResponse } from "../types/EvaluationResponse";
export interface ResultProps {
  hintApiResponse: EvaluationResponse;
  handleSessionRestart: () => void;
  isQuestion: boolean;
  handlePracticeQuestion: () => void;
}

export default function Results({
  hintApiResponse,
  handleSessionRestart,
  isQuestion,
  handlePracticeQuestion,
}: ResultProps) {
  return (
    <div className="flex flex-col w-full h-56 p-2">
      {isQuestion ? (
        <div>
          <p className="mb-2 text-lg font-bold">Practice Question:</p>
          <p className="mb-2 text-lg ">{hintApiResponse.practiceQuestion}</p>
        </div>
      ) : (
        <>
          <div className="flex flex-row">
            <p className="mb-2 text-lg font-bold mr-2">Result:</p>
            <p className="mb-2 text-lg">
              {hintApiResponse.result === null
                ? ""
                : hintApiResponse.result
                ? "Pass"
                : "Failed"}
            </p>
          </div>
          {hintApiResponse.result ? (
            <div className="flex flex-row items-baseline">
              <p className="mb-2 text-lg mr-4">
                Want a similar practice question?
              </p>

              <button
                className="p-1 mr-4 bg-[#00D600] hover:bg-[#00A300]"
                onClick={handlePracticeQuestion}
              >
                Click Here
              </button>

              <button
                className="p-1 bg-[#FF6169] hover:bg-[#FF2E38]"
                onClick={handleSessionRestart}
              >
                Start a new session
              </button>
            </div>
          ) : (
            <div className="flex flex-row">
              <p className="mb-2 text-lg font-bold mr-2">Hint:</p>
              <p className="mb-2 text-lg">{hintApiResponse.hint}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}