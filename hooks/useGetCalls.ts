import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useEffect, useState } from 'react'

export const useGetCalls = () => {
    const [calls, setCalls] = useState<Call[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useUser();
    const client = useStreamVideoClient();

    useEffect(() => {
        const loadCalls = async () => {
            if (!client || !user) return;

            setIsLoading(true);
            try {
                const { calls: fetchedCalls } = await client.queryCalls({
                    filter_conditions: {
                        starts_at: { $exists: true },
                    },
                });

                setCalls(fetchedCalls);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
        loadCalls();
    }, [client, user?.id]);

    const now = new Date();

    const endedCalls = calls.filter(({ state: { startsAt, endedAt } }: Call) => {
        return (startsAt && new Date(startsAt) < now || !!endedAt);
    });

    const upcomingCalls = calls.filter(({ state: { startsAt } }) => {
        return (startsAt && new Date(startsAt) > now);
    })

    return {
        endedCalls,
        upcomingCalls,
        callRecordings: calls,
        isLoading,
    }
}