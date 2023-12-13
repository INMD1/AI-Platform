import { auth } from '@clerk/nextjs';
import { NextResponse } from "next/server";
import OpenAI from 'openai';
const openapi = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})


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

        const response = await openapi.chat.completions.create(
            {
                messages,
                model: 'gpt-3.5-turbo'
            }
        )
        return NextResponse.json(response.choices[0].message);
        
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal error", { status: 500 });
    }
}