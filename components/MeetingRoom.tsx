import { cn } from '@/lib/utils';
import { CallControls, CallingState, CallParticipantsList, CallStatsButton, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from '@stream-io/video-react-sdk';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LayoutList, Users } from 'lucide-react';
import { useSearchParams } from 'next/dist/client/components/navigation';
import EndCallButton from './EndCallButton';
import { useState } from 'react';
import Loader from './Loader';
import { routerServerGlobal } from 'next/dist/server/lib/router-utils/router-server-context';
import { useRouter } from 'next/navigation';

type CallLayuotType = "grid" | "speaker-left" | "speaker-right";

export default function MeetingRoom() {
  const router = useRouter();

  const [layout, setLayout] = useState<CallLayuotType>("speaker-left");
  const [showParticipants, setShowParticipants] = useState(false);
  const layouts: CallLayuotType[] = ["grid", "speaker-left", "speaker-right"];

  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) return <Loader />

  const CallLayout = () => {
    switch (layout) {
      case "grid": return <PaginatedGridLayout />;
      case "speaker-left": return <SpeakerLayout participantsBarPosition="right" />
      default: return <SpeakerLayout participantsBarPosition="left" />

    }
  }
  return (
    <section className='w-full h-screen'>
      <div className="size-full flex items-center max-w-[1000px]">
        <CallLayout />
      </div>

      <div className='flex-wrap fixed bottom-0 w-full flex items-center justify-center gap-4'>
        <CallControls onLeave={() => router.push('/')} />
        <DropdownMenu>
          <DropdownMenuTrigger className='bg-white/5 hover:bg-white/10 cursor-pointer px-4 py-2 rounded-xl'>
            <LayoutList className='text-white' />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-dark-1 border-dark-1 text-white">
            {layouts.map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => setLayout(item as CallLayuotType)}
                >
                  {item}
                </DropdownMenuItem>
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton />
        <button className="bg-white/5 hover:bg-white/10 rounded-2xl px-4 py-2 cursor-pointer" onClick={() => {
          setShowParticipants(value => !value)
        }}>
          <Users className="text-white" />
        </button>
      </div>
      <div className={cn({ "show-block": showParticipants }, "h-full fixed top-0 right-0 hidden")}>
        <CallParticipantsList onClose={() => setShowParticipants(false)} />
      </div>
    </section>
  )
}
