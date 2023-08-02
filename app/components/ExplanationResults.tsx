import { ExplanationResponse } from "../types/ExplanationResponse";

export interface ExplanationResultProps {
    explanationApiResponse: ExplanationResponse
  }
  
  export default function ExplanationResults({
    explanationApiResponse
  }: ExplanationResultProps) {
    return (
      <div className="flex flex-col w-full h-56 p-2">
          <>
            {explanationApiResponse.explanation ? (
              <div className="flex flex-row items-baseline">
                <p className="mb-2 text-lg mr-4">
                  {explanationApiResponse.explanation}
                </p>
              </div>
            ) : (
              <div className="flex flex-row">   
                
              </div>
            )}
          </>
      </div>
    );
  }