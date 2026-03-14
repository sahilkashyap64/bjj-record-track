import { useState, useCallback, useEffect } from 'react';
import { db } from '../db/db';
import { AppSettings } from '../types';
import { defaultSettings } from '../db/schema';

export const useSettings = () => {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSettings = useCallback(async () => {
    try {
      const existing = await db.settings.toArray();
      if (existing.length > 0) {
        setSettings(existing[0]);
      } else {
        await db.settings.add(defaultSettings);
        setSettings(defaultSettings);
      }
    } catch (err) {
      console.error('Failed to fetch settings:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateSettings = useCallback(async (updates: Partial<AppSettings>) => {
    try {
      const updated = { ...settings, ...updates };
      await db.settings.clear();
      await db.settings.add(updated);
      setSettings(updated);
    } catch (err) {
      console.error('Failed to update settings:', err);
      throw err;
    }
  }, [settings]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  return {
    settings,
    isLoading,
    updateSettings,
  };
};