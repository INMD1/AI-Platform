"use client"


import * as z from "zod"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Axios from "axios"
import { Code } from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown"

import { Heading } from "@/components/heading"
import { formSchema } from "./converstaion";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form"
import * as openai from 'openai/resources/index.mjs';
import { Empty } from "@/components/empty";
import { Loader } from "@/components/Loader";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";

const codepage = () => {
    const router = useRouter();
    const [messages, setMessages] = useState<openai.ChatCompletionMessageParam[]>([])
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const userMessage = {
                role: 'user',
                content: values.prompt,
            }

            const newMessages = [...messages, userMessage]

            const responce = await Axios.post("/api/code", {
                messages: newMessages,
            });
            setMessages((current) => [...current, userMessage, responce.data])

            form.reset();
        } catch (error: any) {
            console.log(error);

        } finally {
            router.refresh()
        }
    };
    return (
        <div>
            <Heading
                title="Code Generation"
                description="Generate code using descriptive text."
                icon={Code}
                iconcolor="text-green-500"
                bgcolor="bg-green-500/10"
            />
            <div className="px-4 lg:px-8">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
                    >
                        <FormField
                            name="prompt"
                            render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-10">
                                    <FormControl className="m-0 p-0">
                                        <Input
                                            className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                            disabled={isLoading}
                                            placeholder="Simple toggle button using react hooks."
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button className="col-span-12 lg:col-span-2" disabled={isLoading}>
                            Generation
                        </Button>
                    </form>
                </Form>
            </div>
            <div className="space-y-4 mt-4">
                {
                    isLoading && (
                        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                            <Loader />
                        </div>
                    )
                }
                {messages.length === 0 && !isLoading && (
                    <Empty />
                )}
                <div className="flex flex-col-reverse gap-y-4">
                    {messages.map((message) => (
                        // eslint-disable-next-line
                        <div
                            className={cn("p-8 w-full flex items-start gap-x-8 rounded-log", message.role === 'user' ? "bg-white border border-black/10" : "bg-muted")}
                            key={message.content}>
                            {message.role != "user" && <BotAvatar />}
                            <p className="text-sm">
                                <ReactMarkdown
                                components={{
                                    pre: ({node, ...props}) => (
                                        <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                                            <pre {...props}/>
                                        </div>
                                    ),
                                    code: ({node, ...props}) => (
                                        <div className="bg-black/10 p-1 rounded-lg p-1">
                                            <code {...props}/>
                                        </div>
                                    ),
                                }}
                                className="text-sm overflow-hidden leading-7" >
                                    {message.content || ""}
                                </ReactMarkdown>

                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default codepage;