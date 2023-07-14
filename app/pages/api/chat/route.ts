import { openai } from '@/app/utils/openai';
import { NextResponse } from 'next/server'

// export async function GET(request: Request) {};

export async function POST() {
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system", 
                content: "You are a helpful assistant."
            }, 
            {
                role: "user", 
                content: "Hello world"
            }
        ],
    });
    
    console.log(completion.data.choices[0].message);
   
    const data = await completion.json()
   
    return NextResponse.json(data)
  }

// export async function PUT(request: Request) {};