import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import { CopyIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

interface MeetingCardProps {
    icon: string;
    title: string;
    date: string;
    buttonIcon1: string | undefined;
    buttonText1: string;
    buttonIcon2: string | undefined;
    buttonText2: string | undefined;
    isPreviousMeeting: boolean;
    link: string;
    handleClick: () => void;
}

function MeetingCard({ icon, isPreviousMeeting, title, date, buttonIcon1, buttonText1, buttonIcon2, buttonText2, link, handleClick }: MeetingCardProps) {

    return (
        <section className="rounded-[14px] bg-dark-1 px-6 py-8">
            <article className='flex flex-col gap-2'>
                <Image className="lg:size-[30px]" src={icon} alt={title} width={24} height={24} />
                <h2 className="sm:text-lg xl:text-2xl font-bold">{title}</h2>
                <p className="text-base">{date}</p>
            </article>
            <article className="flex flex-wrap items-center justify-between gap-4 mt-9">
                {!isPreviousMeeting && (
                    <div className='flex gap-4'>
                        <Button onClick={handleClick} className={cn("text-base py-4 rounded-sm cursor-pointer bg-blue-1")}>
                            {buttonIcon1 && <Image src={buttonIcon1} alt={buttonText1} width={13} height={13} />}
                            {buttonText1}
                        </Button>
                        <Button onClick={() => {
                            navigator.clipboard.writeText(link);
                            toast.success('Link copied to clipboard');
                        }} className={cn("text-base py-4 rounded-sm cursor-pointer bg-blue-2")}>
                            {buttonIcon2 && <Image src={buttonIcon2} alt={buttonText2 || ""} width={13} height={13} />}
                            {buttonText2}
                        </Button>
                    </div>
                )}
            </article>
        </section>
    )
}

export default MeetingCard