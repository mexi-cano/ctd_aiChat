"use client";
import 'tailwindcss/tailwind.css'
import Editor from '@monaco-editor/react';
import { useState } from "react";
import { fetchBotReply } from './utils/openai';

interface HintResponse {
  result: string;
  hint: string; 
}

export default function Home() {
  const codeQuestion = 'Write a JavaScript arrow function that adds two values and returns their sum.';
  
  const [message, setMessage] = useState('');
  const [questionApiResponse, setQuestionApiResponse] = useState('');
  const [hintApiResponse, setHintApiResponse] = useState<HintResponse>({
    result: '',
    hint: ''
  });
  const [codeAttempt, setCodeAttempt] = useState('');

  function handleEditorChange(value: any, event: any) {
    setCodeAttempt(value);
  };

  const resetInput = () => {
    setMessage('');
  };

  const handleInput = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setMessage(target.value);
  };

  const handleHintSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    
    fetchBotReply(`task: ${codeQuestion} my solution: ${codeAttempt}`).then((response) => {
      const hintResponse = JSON.parse(response.choices[0].message.content);
      setHintApiResponse({
        result: hintResponse.result,
        hint: hintResponse.hint
      });
    });
  };

  const handleQuestionSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    fetchBotReply(message).then(response => setQuestionApiResponse(response.choices[0].message.content)).then(() => resetInput());
  };

  return (
    <main className="min-h-screen p-24">
      <div className="grid grid-rows-3 gap-4 font-mono">
        <div className='col-span-6 mb-5'>
          <p className='mb-5'>{codeQuestion}</p>
          <Editor
            height="60vh"
            defaultLanguage="javascript"
            defaultValue="// code here"
            onChange={handleEditorChange}
          />
        </div>
        <div className='col-span-3'>
          <p className='mb-2'>Stuck? Ask CtD Genie for a hint:</p>
          <form 
            onSubmit={handleHintSubmit}>
              <button 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-5 rounded focus:outline-none focus:shadow-outline" 
              type="submit"
              >
              Get Hint
            </button>
            <p>Result: {hintApiResponse.result}</p>
          <p>Hint: {hintApiResponse.hint}</p>
          </form>
        </div>
        <div className='col-span-3'>
          <p className='mb-2'>Or ask CtD Genie a question:</p>
          <form 
            onSubmit={handleQuestionSubmit}>
            <input 
              className='shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline' 
              type='text'
              placeholder='Type your question here.'
              value={message}
              onChange={handleInput}
            />
            <button 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-5 rounded focus:outline-none focus:shadow-outline" 
              type="submit"
            >
            Submit
          </button>
          <p>{questionApiResponse}</p>
          </form>
        </div>
      </div>
    </main>
  )
};