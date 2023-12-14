"use client"


import * as z from "zod"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Axios from "axios"
import { Code } from "lucide-react";

import { Heading } from "@/components/heading"
import { amountOptions, formSchema } from "./converstaion";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form"
import { Empty } from "@/components/empty";
import { Loader } from "@/components/Loader";
import { useState } from "react";
import { Select, SelectContent, SelectItem } from "@/components/ui/select"
import { SelectTrigger, SelectValue } from "@radix-ui/react-select";

const ConversationPage = () => {
    const router = useRouter();
    const [images, setImages] = useState<string[]>([]);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
            amount: "1",
            resolution: "512x512"
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setImages([])
            const responce = await Axios.post("/api/image", values);
            const urls = responce.data.map((image: { url: String }) => { image.url })
            setImages(urls)
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
                                            placeholder="A picture of a horse in Swissapls"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="amount"
                            render={({field}) => (
                                <FormItem className="col-span-12 lg:col-span-6">
                                    <Select
                                        disabled={isLoading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue>
                                                    <SelectValue defaultValue={field.value}/>
                                                </SelectValue>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {amountOptions.map((option) => {
                                                <SelectItem
                                                key={option.value}
                                                value={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            })}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                            >

                        </FormField>
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
                {images.length === 0 && !isLoading && (
                    <Empty />
                )}
            </div>
        </div>
    );
};

export default ConversationPage;