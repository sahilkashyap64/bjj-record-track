import { useState, useCallback, useEffect } from 'react';
import { db } from '../db/db';
import { TrainingLog } from '../types';
import { generateId } from '../db/schema';

export const useTrainingLogs = () => {
  const [logs, setLogs] = useState<TrainingLog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLogs = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await db.logs.orderBy('sessionDate').reverse().toArray();
      setLogs(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch logs');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createLog = useCallback(async (logData: Omit<TrainingLog, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newLog: TrainingLog = {
        ...logData,
        id: generateId(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await db.logs.add(newLog);
      await fetchLogs();
      return newLog;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to create log');
    }
  }, [fetchLogs]);

  const updateLog = useCallback(async (id: string, updates: Partial<TrainingLog>) => {
    try {
      await db.logs.update(id, {
        ...updates,
        updatedAt: new Date(),
      });
      await fetchLogs();
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to update log');
    }
  }, [fetchLogs]);

  const deleteLog = useCallback(async (id: string) => {
    try {
      await db.logs.delete(id);
      await fetchLogs();
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to delete log');
    }
  }, [fetchLogs]);

  const getLogById = useCallback(async (id: string) => {
    try {
      return await db.logs.get(id);
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to fetch log');
    }
  }, []);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return {
    logs,
    isLoading,
    error,
    createLog,
    updateLog,
    deleteLog,
    getLogById,
    refetch: fetchLogs,
  };
};