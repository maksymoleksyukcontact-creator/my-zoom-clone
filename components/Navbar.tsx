"use client"

import Image from 'next/image'
import Link from 'next/link'
import MobileNav from './MobileNav'
import { SignInButton, UserButton } from '@clerk/nextjs'
import { useUser } from '@clerk/nextjs'

function Navbar() {
    const { isSignedIn } = useUser()

    return (
        <nav className='flex-between fixed z-50 w-full
                        bg-dark-1 px-6 py-4 lg:px-10'
        >
            <Link href="/" className='flex items-center gap-1'>
                <Image alt="yoom logo" width={40} height={40} src='/icons/logo.svg' />
                <p className='text-white font-extrabold text-2xl max-sm:hidden'>YOOM</p>
            </Link>
            <div className='flex items-center gap-4'>
                <SignInButton><UserButton /></SignInButton>
                <MobileNav />
            </div>
        </nav>
    )
}

export default Navbar