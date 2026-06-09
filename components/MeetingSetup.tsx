import { useCall, VideoPreview } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

function MeetingSetup({ setIsSetupComplete }: { setIsSetupComplete: (value: boolean) => void }) {
  const [isCamMicToggleOn, setIsCamMicToggleOn] = useState(false);
  const call = useCall();

  if (!call) throw new Error("Call object is not available in MeetingSetup component");

  useEffect(() => {
    if (!isCamMicToggleOn) {
      call?.camera.enable();
      call?.microphone.enable();
    } else {
      call?.camera.disable();
      call?.microphone.disable();
    }
  }, [isCamMicToggleOn, call]);

  return (
    <div className='w-full h-screen flex-center flex-col gap-4 text-white'>
      <h1 className='text-2xl font-bold'>Meeting Setup</h1>
      <VideoPreview />
      <div className='flex flex-col items-center gap-4'>
        <label className='flex items-center gap-2 cursor-pointer'>
          <input type="checkbox" onChange={(e) => setIsCamMicToggleOn(e.target.checked)} />
          <span>Disable camera and microphone</span>
        </label>
        <Button className="text-base font-bold bg-green-600 hover:bg-green-700 cursor-pointer w-full"
          onClick={() => {
            call.join();
            setIsSetupComplete(true);
          }}
        >
          Join Meeting
        </Button>
      </div>
    </div >
  )
}

export default MeetingSetup