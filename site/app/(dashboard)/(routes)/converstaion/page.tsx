"use client"


import * as z from "zod"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Axios from "axios"
import { Heading } from "@/components/heading"
import { MessageSquare } from "lucide-react";

import { formSchema } from "./converstaion";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form"
import * as openai from 'openai/resources/index.mjs';
import { Empty } from "@/components/empty";

const ConversationPage = () => {
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

            const responce = await Axios.post("/api/converstaion", {
                messages: newMessages,
            });
            setMessages((current) => [...current, userMessage, responce.data ])

            form.reset();
        } catch (error : any) {
            console.log(error);
            
        } finally {
            router.refresh()
        }
    };
    return (
        <div>
            <Heading
                title="conversation"
                description="our advanced conversation model."
                icon={MessageSquare}
                iconcolor="text-violet-500"
                bgcolor="bg-violet-500/10"
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
                                            placeholder="How do I calculate the radius of a circle"
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
                {messages.length === 0 && !isLoading && (
                   <Empty/>
                )}
                <div className="flex flex-col-reverse gap-y-4">
                    {messages.map((message) => (
                       <div key={message.content}>
                         {message.content}
                       </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ConversationPage;