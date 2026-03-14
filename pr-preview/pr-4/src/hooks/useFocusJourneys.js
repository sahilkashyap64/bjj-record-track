import { useCallback, useEffect, useState } from 'react';
import { createFocusJourney, deleteFocusJourney, getFocusJourneyById, listFocusJourneys, updateFocusJourney, } from '@/db/repository';
export function useFocusJourneys() {
    const [journeys, setJourneys] = useState([]);
    const [loading, setLoading] = useState(true);
    const refresh = useCallback(async () => {
        setLoading(true);
        setJourneys(await listFocusJourneys());
        setLoading(false);
    }, []);
    useEffect(() => {
        refresh().catch(console.error);
    }, [refresh]);
    return { journeys, loading, refresh, createFocusJourney, updateFocusJourney, deleteFocusJourney, getFocusJourneyById };
}
