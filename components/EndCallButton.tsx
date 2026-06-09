import React from 'react'
import { Button } from './ui/button'
import { PhoneMissed } from 'lucide-react'
import { useRouter } from 'next/navigation';
import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk';

const EndCallButton = () => {
    const router = useRouter();
    const call = useCall();
    const { useLocalParticipant } = useCallStateHooks();
    const localParticipant = useLocalParticipant();

    const isMeetingOwner = localParticipant &&
        call?.state.createdBy && localParticipant.userId ===
        call.state.createdBy.id;

    if (!isMeetingOwner) return null;

    return (
        <Button onClick={async () => {
            await call?.endCall();
            router.push('/');
        }} className="bg-red-500 hover:bg-red-600 rounded-2xl px-4 py-2 cursor-pointer">
            <PhoneMissed size={24} />
        </Button>
    )
}

export default EndCallButton