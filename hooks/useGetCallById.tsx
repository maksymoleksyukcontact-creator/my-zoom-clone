"use client";

import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useEffect, useState } from 'react'

function useGetCallById(id: string | string[]) {
    const [call, setCall] = useState<Call>();
    const [isCallLoading, setIsCallLoading] = useState(true);

    const client = useStreamVideoClient();

    useEffect(() => {
        if (!client) return;

        const fetchCall = async () => {
            const { calls } = await client.queryCalls({
                filter_conditions: { id }
            });

            if (calls.length > 0) {
                setCall(calls[0]);
            }

            setIsCallLoading(false);
        }

        fetchCall();
    }, [client, id]);

    return { call, isCallLoading };
}

export default useGetCallById