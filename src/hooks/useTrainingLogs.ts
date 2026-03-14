import { useCallback, useEffect, useState } from 'react';
import type { TrainingLog } from '@/types';
import {
  createLog,
  deleteLog,
  duplicateLog,
  getLogById,
  listLogs,
  updateLog,
} from '@/db/repository';

export function useTrainingLogs() {
  const [logs, setLogs] = useState<TrainingLog[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    setLogs(await listLogs());
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh().catch(console.error);
  }, [refresh]);

  return {
    logs,
    loading,
    refresh,
    createLog,
    updateLog,
    deleteLog,
    duplicateLog,
    getLogById,
  };
}
