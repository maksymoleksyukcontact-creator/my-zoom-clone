import Image from 'next/image'
import React from 'react'

interface HomeCardProps {
    icon: string;
    title: string;
    description: string;
    color: string;
    handleClick: () => void;
};

function HomeCard({ icon, title, description, color, handleClick }: HomeCardProps) {
    return (
        <div className={`flex flex-col justify-between rounded-[14px]
                w-full lg:max-w-[320px] min-h-[260px]
                px-4 py-6 cursor-pointer ${color}`}
            onClick={handleClick}
        >
            <div className='size-12 glassmorphism flex-center rounded-sm'>
                <Image src={icon} alt={title} width={27} height={27} />
            </div>
            <div className='flex flex-col gap-2'>
                <h2 className='text-2xl font-bold'>{title}</h2>
                <p className='text-lg font-normal'>{description}</p>
            </div>
        </div>
    )
}

export default HomeCard