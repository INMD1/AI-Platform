"use client"


import * as z from "zod"
import { Heading } from "@/components/heading"
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./converstaion";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input"
import { Form, FormField, FormItem, FormControl} from "@/components/ui/form"
const converstaionPage = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)
    };

    return (
        <div>
            <Heading
                title="conversation"
                description="our advanced conversation model."
                icon={MessageSquare}
                iconcolor="text-violet-500"
                bgcolor="bg-violet-500/10" />
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}
                            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2">

                        </form>
                    </Form>
                    <FormField name="prompt"
                        render={({ field }) => (
                            <FormItem className="col-span-12 lg:col-span-10">
                                <FormControl className="m-0 p-0">
                                    <Input className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transoarent"
                                        disabled={isLoading}
                                        placeholder="How do i calculate the radius of a circle"/>
                                </FormControl>
                            </FormItem>
                        )} />
                </div>
            </div>
        </div>
    )
}
export default converstaionPage;