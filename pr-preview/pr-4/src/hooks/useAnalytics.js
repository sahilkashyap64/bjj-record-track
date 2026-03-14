import { useMemo, useState } from 'react';
import { calculateAnalytics } from '@/utils/analytics';
export function useAnalytics(logs, settings) {
    const [range, setRange] = useState({ preset: '30d' });
    const snapshot = useMemo(() => calculateAnalytics(logs, settings, range), [logs, settings, range]);
    return { range, setRange, snapshot };
}
