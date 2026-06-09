"use client";

import { useState } from 'react'
import HomeCard from './HomeCard'
import MeetingModal from './MeetingModal';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import { toast } from "sonner"
import { Textarea } from './ui/textarea';
import DatePicker from "react-datepicker";
import { Input } from './ui/input';

type valuesType = {
    dateTime: Date | null;
    description: string | undefined;
    link: string;
}

function MeetingsList() {
    const router = useRouter();
    const [meeting, setMeeting] = useState<'isCreateMeeting'
        | 'isScheduleMeeting'
        | 'isJoinMeeting'
        | undefined>();

    const { user } = useUser();
    const client = useStreamVideoClient();
    const [values, setValues] = useState<valuesType>({
        dateTime: new Date(),
        description: '',
        link: '',
    });
    const [callDetails, setCallDetails] = useState<Call | undefined>();

    const createMeeting = async () => {
        if (!values.dateTime) {
            toast.error('Please select a date and time for the meeting');
            return;
        }
        if (!client || !user) return;
        try {
            const id = crypto.randomUUID();
            const call = client.call("default", id);

            if (!call) throw new Error("Call is not created");

            const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
            const description = values.description || 'Instant meeting';

            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom: {
                        description,
                    }
                }
            })

            setCallDetails(call);

            if (!values.description) {
                router.push(`/meeting/${call.id}`);
            }
            toast.success('Meeting created successfully!');

        } catch (error) {
            console.log(error);
            toast.error('Failed to create meeting. Please try again.');
        }
    }

    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`

    return (
        <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
            <HomeCard
                icon="/icons/add-meeting.svg"
                title="Create Meeting"
                description="Create a new recording"
                color="#FF742E"
                handleClick={() => setMeeting('isCreateMeeting')}
            />
            <HomeCard
                icon="/icons/join-meeting.svg"
                title="Join Meeting"
                description="via invitation link"
                color="#0E78F9"
                handleClick={() => setMeeting('isJoinMeeting')}

            />
            <HomeCard
                icon="/icons/schedule.svg"
                title="Schedule Meeting"
                description="Plan your meeting"
                color="#830EF9"
                handleClick={() => setMeeting('isScheduleMeeting')}
            />
            <HomeCard
                icon="/icons/Video.svg"
                title="View Recordings"
                description="Meeting recordings"
                color="#F9A90E"
                handleClick={() => router.push('/recordings')}
            />
            {!callDetails ? (
                <MeetingModal
                    isOpen={meeting === 'isScheduleMeeting'}
                    onClose={() => setMeeting(undefined)}
                    title="Schedule a meeting"
                    buttonText="Schedule Meeting"
                    handleClick={createMeeting}
                >
                    <div className="flex flex-col gap-4 w-full">
                        <label>Add a description</label>
                        <Textarea className="bg-dark-2 border-0 focus-visible:ring-0"
                            onChange={(e) => setValues({ ...values, description: e.target.value })} />
                    </div>
                    <div className="flex flex-col gap-4 w-full">
                        <label>Pick a time</label>
                        <DatePicker
                            className="bg-dark-2 p-2 rounded-lg"
                            selected={values.dateTime}
                            onChange={(date: Date | null) => setValues({ ...values, dateTime: date })}
                            showTimeSelect
                            dateFormat="MMMM d, yyyy h:mm aa"
                        />
                    </div>
                </MeetingModal>
            ) : (
                <MeetingModal
                    isOpen={meeting === 'isScheduleMeeting'}
                    onClose={() => setMeeting(undefined)}
                    title="Meeting Created"
                    buttonText="Copy Meeting Link"
                    image="/icons/checked.svg"
                    buttonIcon="/icons/copy.svg"
                    handleClick={() => {
                        navigator.clipboard.writeText(meetingLink);
                        toast.success('Meeting link copied to clipboard!');
                    }}
                />
            )}
            <MeetingModal
                isOpen={meeting === 'isCreateMeeting'}
                onClose={() => setMeeting(undefined)}
                title="Create a meeting"
                buttonText="Create a Meeting"
                handleClick={createMeeting}
            />
            <MeetingModal
                isOpen={meeting === 'isJoinMeeting'}
                onClose={() => setMeeting(undefined)}
                title="Join a meeting"
                buttonText="Join a Meeting"
                handleClick={() => values.link && router.push(values.link)}
            >
                <div className='flex flex-col gap-4 w-full'>
                    <label>Add an invite link</label>
                    <Input className="bg-dark-2 border-0 focus-visible:ring-0"
                        placeholder="Meeting link"
                        onChange={(e) => setValues({ ...values, link: e.target.value })} />
                </div>
            </MeetingModal>
        </section>
    )
}

export default MeetingsList