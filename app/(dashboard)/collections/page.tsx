"use client"

import { DataTable } from '@/components/custom-ui/DataTable';
import { useState, useEffect } from 'react';
import { columns } from "@/components/collections/CollectionColumn";
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';

const CollectionsPage = () => {
    const [loading, setLoading] = useState(true);
    const [collections, setCollections] = useState([]);

    const router = useRouter();

    const getCollections = async () => {
        try {
            const res = await fetch('/api/collections', {
                method: "GET"
            });

            const data = await res.json();
            setCollections(data);
            setLoading(false);
        } catch (error) {
            console.log("Error fetching collections: ", error);
        }
    };

    useEffect(() => {
        getCollections();
    }, []);
    return (
        <div className='px-10 py-5'>
            <div className="flex items-center justify-between">
                <p className="text-heading2-bold">Collections</p>
                <Button className="bg-blue-1 text-white" onClick={() => router.push('/collections/new')}>
                    <Plus className='w-4 h-4 mr-2' />
                    Create Collection
                </Button>
            </div>
            <Separator className='my-4 bg-grey-1' />
            <DataTable columns={columns} data={collections} searchKey='title' />
        </div>
    )
}

export default CollectionsPage