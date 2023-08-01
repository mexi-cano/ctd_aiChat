import { FC } from 'react' 
import Editor from "@monaco-editor/react";
import ExplanationResults from '../ExplanationResults';
import ExplainComponentProps from '@/app/types/ExplainComponentProps';

const Explain: FC<ExplainComponentProps> = ({
  codeAttempt,
  handleEditorChange,
  handleSubmit,
  explanationApiResponse
}) => {

  return (
    <>
      <h1 className="mb-2 text-3xl">Function Explanation Tool</h1>

      <p className="mb-2"> 
        Enter a function and I will explain it.
      </p>
      
      <Editor 
        width="100%" 
        height="100%" 
        defaultLanguage="javascript" 
        theme="vs-dark" 
        value={codeAttempt} 
        onChange={handleEditorChange} 
      />

    <form className="flex flex-row w-full h-20 items-center mt-4" onSubmit={handleSubmit}>
        <div className="flex-1"></div>
        <div>
            <button type="submit" className="border-2 p-4 bg-[#097969] hover:bg-[#0B4D4D] text-white text-xl">
                Evaluate 
            </button>
        </div>
    </form>

      <ExplanationResults
        explanationApiResponse={explanationApiResponse}
      />
    </>
  )
}

export default Explain