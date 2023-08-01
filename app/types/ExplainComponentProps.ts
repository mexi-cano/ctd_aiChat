import { ExplanationResponse } from "./ExplanationResponse"

export default interface ExplainComponentProps {
    codeAttempt: string
    handleEditorChange: (value: any) => void
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
    explanationApiResponse: ExplanationResponse
  }

  // function add(a, b){
  //   return a + b;
  // }