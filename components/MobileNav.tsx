"use client";

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image'
import Link from 'next/link'
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils";

function MobileNav() {
    const pathname = usePathname();

    return (
        <section>
            <Sheet>
                <SheetTrigger className="sm:hidden"><Image alt="hamburger button" width={40} height={40} src='/icons/hamburger.svg' /></SheetTrigger>
                <SheetContent side="left" className='border-none bg-dark-1 text-white
                px-6 py-4 lg:px-10'>
                    <Link href="/" className='flex items-center gap-1'>
                        <Image alt="yoom logo" width={40} height={40} src='/icons/logo.svg' />
                        <p className=' font-extrabold text-2xl'>YOOM</p>
                    </Link>
                    <div className="h-full">
                        <SheetClose className="flex flex-col w-full max-w-[264px]">
                            {sidebarLinks.map((link) => {
                                const isActive = pathname === link.route || (pathname.startsWith(link.route) && link.route !== '/')

                                return (
                                    <SheetClose asChild key={link.label}>
                                        <Link href={link.route} className={cn('flex items-center gap-4 p-4 rounded-lg w-full', { 'bg-blue-1': isActive })}>
                                            <Image alt={link.label} width={20} height={20} src={link.imgUrl} />
                                            <p>{link.label}</p>
                                        </Link>
                                    </SheetClose>
                                )
                            })}
                        </SheetClose>
                    </div>
                </SheetContent>
            </Sheet>
        </section>
    )
}

export default MobileNav