import { EvaluationResponse } from "./EvaluationResponse"

export default interface AssessmentComponentProps {
    codeAttempt: string
    handleEditorChange: (value: any) => void
    userInput: string 
    handleUserInput: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
    hintApiResponse: EvaluationResponse
    handleSessionRestart: () => void
    isQuestion: boolean
    handlePracticeQuestion: () => void
  }