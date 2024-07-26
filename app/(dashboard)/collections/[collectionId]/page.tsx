"use client"

import { useEffect, useState } from 'react'
import Loader from '../../../../components/custom-ui/Loader';
import CollectionForm from '@/components/collections/CollectionForm';

const CollectionDetail = ({ params }: { params: { collectionId: string } }) => {
    const [loading, setLoading] = useState(false);
    const [collection, setCollection] = useState<CollectionType | null>(null);

    const fetchCollection = async () => {
        try {
            setLoading(true);
            const res = await fetch(`/api/collections/${params.collectionId}`, {
                method: 'GET',
            });
            if (res.ok) {
                const data = await res.json();
                setCollection(data);
            }
            setLoading(false);
        } catch (error) {
            console.log("Error fetching collection: ", error);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCollection();
    }, []);

    return loading ? <Loader /> : (
        <CollectionForm initialData={collection} />
    )
}

export default CollectionDetail