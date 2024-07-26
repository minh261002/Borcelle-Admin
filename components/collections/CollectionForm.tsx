"use client"

import { z } from 'zod';
import { Separator } from '../ui/separator'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from '../ui/textarea';
import ImageUpload from '../custom-ui/ImageUpload';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Delete from '../custom-ui/Delete';

const formSchema = z.object({
    title: z.string().min(2).max(20),
    description: z.string().min(2).max(500).trim(),
    image: z.string()
});

interface CollectionFormProps {
    initialData?: CollectionType | null
}

const CollectionForm = ({ initialData }: CollectionFormProps) => {
    const router = useRouter();
    const params = useParams();
    const [loading, setLoading] = useState(false);

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ? initialData : {
            title: '',
            description: '',
            image: ''
        }
    });

    const onSubmit = async (value: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            const url = initialData ? `/api/collections/${initialData._id}` : '/api/collections';
            const res = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(value),
            });

            if (res.ok) {
                setLoading(false);
                toast.success(`Collection ${initialData ? 'updated' : 'created'} successfully`);
                window.location.href = "/collections"
                router.push('/collections');
            } else {
                const data = await res.json();
                console.log("Error creating collection: ", data);
                toast.error(data.message);
                setLoading(false);
            }

        } catch (error) {
            console.log("Error creating collection: ", error);
            toast.error('Something went wrong');
            setLoading(false);
        }
    };

    return (
        <div className='p-10'>
            {initialData ? (
                <div className="flex items-center justify-between">
                    <p className='text-heading2-bold'>
                        Edit Collection
                    </p>
                    <Delete id={initialData._id} />
                </div>

            ) : (
                <p className='text-heading2-bold'>
                    Create Collection
                </p>
            )}
            <Separator className='my-4 mt-7 bg-grey-1' />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Title" {...field} onKeyDown={handleKeyPress} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Description" {...field} rows={5} onKeyDown={handleKeyPress} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Image</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value ? [field.value] : []}
                                        onChange={(url) => field.onChange(url)}
                                        onRemove={() => field.onChange("")}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className='flex gap-10'>
                        <Button type="submit" className="bg-blue-1 text-white">
                            {
                                initialData ? 'Update Collection' : 'Create Collection'
                            }
                        </Button>
                        <Button type='button' className="bg-blue-1 text-white" onClick={() => router.push('/collections')}>Discard</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default CollectionForm