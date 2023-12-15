"use client"


import * as z from "zod"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Axios from "axios"
import { MessageSquare } from "lucide-react";
i
import { Heading } from "@/components/heading"
import { formSchema } from "./converstaion";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form"
import * as openai from 'openai/resources/index.mjs';
import { Empty } from "@/components/empty";
import { Loader } from "@/components/Loader";


const musicPage = () => {
    const router = useRouter();
    const [music, setMusic] = useState<openai.ChatCompletionMessageParam[]>([])
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {

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
                title="Music Generation"
                description="Turn your prompt into music"
                icon={MessageSquare}
                iconcolor="text-emerald-500"
                bgcolor="bg-emerald-500/10"
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

            </div>
        </div>
    );
};

export default musicPage;