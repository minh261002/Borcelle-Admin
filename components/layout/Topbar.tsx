"use client"

import { navLinks } from "@/lib/constants"
import { UserButton } from "@clerk/nextjs"
import { Menu } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

const Topbar = () => {
    const [dropdown, setDropdown] = useState(false);
    const pathname = usePathname();

    return (
        <div className="sticky top-0 z-20 w-full flex justify-between items-center px-8 py-4 b-blue-2 shadow-xl lg:hidden">
            <Image src={'/logo.png'} width={150} height={70} alt='logo' />

            <div className="flex gap-8 max-md:hidden">
                {navLinks.map((link, index) => (
                    <Link
                        key={index}
                        href={link.url}
                        className={`flex gap-4 text-body-medium ${pathname === link.url ? 'text-blue-1' : 'text-grey-1'}`}>
                        <p>{link.label}</p>
                    </Link>
                ))}
            </div>

            <div className="flex gap-4 items-center relative">
                <Menu
                    className="cursor-pointer md:hidden"
                    onClick={() => setDropdown(!dropdown)}
                />
                {dropdown && (
                    <div className="absolute top-10 right-0 z-10 flex flex-col gap-8 px-5 py-4 bg-white shadow-md">
                        {navLinks.map((link, index) => (
                            <Link key={index} href={link.url} className='text-body-medium'>
                                <span>{link.label}</span>
                            </Link>
                        ))}
                    </div>
                )}
                <UserButton />
            </div>
        </div>
    )
}

export default Topbar