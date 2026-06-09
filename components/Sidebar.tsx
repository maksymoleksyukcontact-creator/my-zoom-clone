'use client';

import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'

function Sidebar() {
    const pathname = usePathname();
    return (
        <section className='sticky left-0 top-0 flex flex-col h-screen w-fit
    justify-between bg-dark-1 text-white p-6 pt-28
    max-sm:hidden lg:w-[264px]'>
            <div className='flex flex-col gap-6'>
                {sidebarLinks.map((link) => {
                    const isActive = pathname === link.route

                    return (
                        <Link href={link.route} key={link.label} className={cn('flex items-center gap-4 p-4 rounded-lg justify-start', {'bg-blue-1': isActive} )}>
                            <Image alt={link.label} width={24} height={24} src={link.imgUrl} />
                            <p>{link.label}</p>
                        </Link>
                    )
                })}
            </div>
        </section>
    )
}

export default Sidebar