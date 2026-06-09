"use client";

import { useUser } from '@clerk/nextjs';

function GreetingsCard() {
    const { user } = useUser();
    return (
        <h1 className='glassmorphism max-w-[260px] flex-center p-2 rounded-[10px]'>Hi{user?.firstName ? `, ${user.firstName}!` : '!'}</h1>

    )
}

export default GreetingsCard