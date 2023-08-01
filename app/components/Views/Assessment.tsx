import { FC } from 'react' 
import Editor from "@monaco-editor/react";
import Results from '../Results';
import AssessmentComponentProps from '@/app/types/AssessmentComponentProps';

const Assessment: FC<AssessmentComponentProps> = ({
  codeAttempt,
  handleEditorChange,
  userInput,
  handleUserInput,
  handleSubmit,
  hintApiResponse,
  handleSessionRestart,
  isQuestion,
  handlePracticeQuestion
}) => {

  return (
    <>
      <h1 className="mb-2 text-3xl">Function Assessment Tool</h1>

      <p className="mb-2"> 
        Present a function and it will evaluate its functionality
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
        <textarea 
          className="text-white bg-\[#252526\] w-full p-2 w-full mr-4" 
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

      <Results
        hintApiResponse={hintApiResponse}
        handleSessionRestart={handleSessionRestart}
        isQuestion={isQuestion}
        handlePracticeQuestion={handlePracticeQuestion} 
      />
    </>
  )
}

export default Assessment