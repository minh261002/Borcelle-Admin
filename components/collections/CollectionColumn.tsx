import { ColumnDef } from "@tanstack/react-table"
import Delete from "../custom-ui/Delete"
import Link from "next/link"

export const columns: ColumnDef<CollectionType>[] = [
    {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => (<Link className="hover:underline hover:text-red-1 transition duration-100" href={`/collections/${row.original._id}`}>{row.original.title}</Link>)
    },
    {
        accessorKey: "products",
        header: "Products",
        cell: ({ row }) => <p>{row.original.products.length}</p>
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => <Delete id={row.original._id} />
    },
]
