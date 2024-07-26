"use client"

import { useState } from 'react'
import { Button } from '../ui/button'
import { Trash } from 'lucide-react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

interface DeleteProps {
    id: string
}

const Delete = ({ id }: DeleteProps) => {
    const [loading, setLoading] = useState(false);
    const onDelete = async () => {
        try {
            setLoading(true);
            const res = await fetch(`/api/collections/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                setLoading(false);
                location.reload();
                toast.success('Collection deleted');
            }
        } catch (error) {
            toast.error('Error deleting collection');
            console.log("Error deleting collection: ", error);
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <Button className='bg-red-1 text-white'>
                    <Trash className='w-4 h-4' />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className='bg-white text-grey-1'>
                <AlertDialogHeader>
                    <AlertDialogTitle className='text-red-1'>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your collection.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className='bg-red-1 text-white'>
                        <Button onClick={onDelete} disabled={loading}>
                            {loading ? 'Deleting...' : 'Delete'}
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default Delete