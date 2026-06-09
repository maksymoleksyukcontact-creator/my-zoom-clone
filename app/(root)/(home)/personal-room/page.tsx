"use client";

import { Button } from '@/components/ui/button';
import useGetCallById from '@/hooks/useGetCallById';
import { cn } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import { routerServerGlobal } from 'next/dist/server/lib/router-utils/router-server-context';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';

type TableProps = {
  title: string;
  description: string;
}

function Table({ title, description }: TableProps) {
  return (
    <div className="flex max-xl:flex-col items-start gap-2">
      <p>{title}:</p>
      <p>{description}</p>
    </div>
  )
}

function PersonalRoom() {
  const { user } = useUser();
  const meetingId = user?.id;
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;
  const { call } = useGetCallById(meetingId!);
  const client = useStreamVideoClient();
  const router = useRouter();

  const startRoom = async () => {
    if (!client || !user) return;

    const newCall = client.call('default', meetingId!);

    if (!call) {
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        }
      })
    }

    router.push(`/meeting/${meetingId}?personal=true`)
  }

  return (
    <section className='flex flex-col gap-10 size-full text-white'>
      <h1 className='text-3xl font-bold'>Personal Room</h1>

      <div className="flex w-full flex-col gap-8">
        <Table title="Topic" description={`${user?.fullName}'s Meeting Room.`} />
        <Table title="Meeting ID" description={meetingId!} />
        <Table title="Invite Link" description={meetingLink} />
      </div>
      <div className="flex gap-2">
        <Button onClick={() => startRoom()} className={cn("text-base py-4 rounded-sm cursor-pointer bg-blue-1")}>
          Start
        </Button>
        <Button onClick={() => {
          navigator.clipboard.writeText(meetingLink);
          toast.success('Link copied to clipboard')
        }}
          className={cn("text-base py-4 rounded-sm cursor-pointer bg-blue-2")}>
          Copy Invite Link
          <Image src={'/icons/copy.svg'} alt="Copy" width={13} height={13} />
        </Button>
      </div>
    </section>
  )
}

export default PersonalRoom