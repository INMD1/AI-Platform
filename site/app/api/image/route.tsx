import { auth } from '@clerk/nextjs';
import { NextResponse } from "next/server";
import { increaseApiLimit, CheckApiLimit } from '@/lib/api-limit';

import OpenAI from 'openai';
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
        const { prompt, amount = 1, resolution = "512x512" } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        if (!openapi.apiKey) {
            return new NextResponse("OpenAI API key not configured", { status: 500 });
        }
        if (!prompt) {
            return new NextResponse("Prompt are required", { status: 400 });
        }
        if (!amount) {
            return new NextResponse("Amount are required", { status: 400 });
        }
        if (!resolution) {
            return new NextResponse("Resolution are required", { status: 400 });
        }

        const freeTrial = await CheckApiLimit()

        if(!freeTrial){
            return new NextResponse("Free trial has expired", {
                status: 403
            })
        }

        const response = await openapi.images.generate(
            {
                prompt,
                n: parseInt(amount,10),
                size: resolution,
            }
        )

        await increaseApiLimit();
        
        return NextResponse.json(response.data);

    } catch (error) {
        console.log(error);
        return new NextResponse("Internal error", { status: 500 });
    }
}