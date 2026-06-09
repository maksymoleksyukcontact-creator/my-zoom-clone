"use client";

import { useGetCalls } from '@/hooks/useGetCalls';
import { useEffect, useState } from 'react'
import MeetingCard from './MeetingCard';
import { Call, CallRecording } from '@stream-io/video-react-sdk';
import Loader from './Loader';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface CallTypesListProps {
  type: 'upcoming' | 'ended' | 'recordings';
}

function CallsList({ type }: CallTypesListProps) {
  const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);
  const router = useRouter();

  const getCalls = () => {
    switch (type) {
      case 'ended':
        return endedCalls;
      case 'upcoming':
        return upcomingCalls;
      case 'recordings':
        return recordings;
      default:
        return [];
    }
  }

  const getNoCallsMessage = () => {
    switch (type) {
      case 'ended':
        return 'No ended calls';
      case 'upcoming':
        return 'No upcoming calls';
      case 'recordings':
        return 'No call recordings';
      default:
        return 'No calls found';
    }
  }

  useEffect(() => {
    const loadRecordings = async () => {
      try {
        const callData = await Promise.all(callRecordings.map((meeting) => meeting.queryRecordings()));

        const recordings = callData.filter((call) => call.recordings.length > 0)
          .flatMap((call) => call.recordings);

        setRecordings(recordings);
      } catch (error) {
        toast.error('Failed to load recordings. Try again later.');
      }
    }

    if (type === 'recordings') loadRecordings();
  }, [callRecordings, type]);

  const calls = getCalls();
  const noCallsMessage = getNoCallsMessage();

  if (isLoading) return <Loader />

  return (
    <div className="rounded-[14px] grid grid-cols-1 lg:grid-cols-2 gap-4">{calls && calls.length > 0 ? calls.map((meeting, index) => {
      const item = meeting as any;
      const uniqueKey = item.id ? `${type}-${item.id}-${index}` : `${type}-${index}`
      return (
        <MeetingCard
          key={uniqueKey}
          icon={type === 'upcoming' ? '/icons/upcoming.svg' : type === 'ended' ? '/icons/previous.svg' : '/icons/recordings.svg'}
          title={item.state?.custom.description?.slice(0, 25) || item.filename?.slice(0, 20) || 'No description'}
          date={item.state?.startsAt?.toLocaleString() || item.start_time.toLocaleString()}
          isPreviousMeeting={type === 'ended'}
          buttonIcon1={type === 'recordings' ? '/icons/play.svg' : undefined}
          buttonText1={type === 'recordings' ? 'Play' : type === 'upcoming' ? 'Start' : ''}
          buttonIcon2={type === 'ended' ? undefined : '/icons/copy.svg'}
          buttonText2={type === 'ended' ? undefined : 'Copy Link'}
          link={type === 'recordings' ? item.url : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${item.id}`}
          handleClick={type === 'recordings' ? () => router.push(item.url) : () => router.push(`/meeting/${item.id}`)}
        />
      )
    }) : (
      <h2>{noCallsMessage}</h2>
    )}</div>
  )
}

export default CallsList