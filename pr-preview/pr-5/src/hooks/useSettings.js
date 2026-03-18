import { useCallback, useEffect, useState } from 'react';
import { defaultSettings } from '@/db/schema';
import { getSettings, updateSettings as persistSettings } from '@/db/repository';
export function useSettings() {
    const [settings, setSettings] = useState(defaultSettings);
    const [loading, setLoading] = useState(true);
    const refresh = useCallback(async () => {
        setLoading(true);
        const next = await getSettings();
        setSettings(next);
        setLoading(false);
    }, []);
    const save = useCallback(async (updates) => {
        const next = await persistSettings(updates);
        setSettings(next);
        return next;
    }, []);
    useEffect(() => {
        refresh().catch(console.error);
    }, [refresh]);
    return { settings, loading, save, refresh };
}
