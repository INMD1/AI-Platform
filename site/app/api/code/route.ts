import { auth } from '@clerk/nextjs';
import { NextResponse } from "next/server";
import OpenAI from 'openai';
import { increaseApiLimit, CheckApiLimit } from '@/lib/api-limit';

import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
const openapi = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

const instructionMessage: ChatCompletionMessageParam = {
    role: "system",
    content: "You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations"
}

export async function POST(
    req: Request
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { messages } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        if (!openapi.apiKey) {
            return new NextResponse("OpenAI API key not configured", { status: 500 });
        }
        if (!messages) {
            return new NextResponse("Messages are required", { status: 400 });
        }

        const freeTrial = await CheckApiLimit()

        if(!freeTrial){
            return new NextResponse("Free trial has expired", {
                status: 403
            })
        }


        const response = await openapi.chat.completions.create(
            {
                messages: [instructionMessage, ...messages],
                model: 'gpt-3.5-turbo'
            }
        )

        await increaseApiLimit();
        return NextResponse.json(response.choices[0].message);
        
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal error", { status: 500 });
    }
}