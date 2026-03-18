import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { seedDatabase } from '@/db/seedData';
import { importAllData } from '@/db/repository';
import { AppShell } from '@/components/layout/AppShell';
import HomePage from '@/pages/Home';
import LogsPage from '@/pages/Logs';
import NewLogPage from '@/pages/NewLog';
import LogDetailPage from '@/pages/LogDetail';
import StatsPage from '@/pages/Stats';
import FocusPage from '@/pages/Focus';
import FocusNewPage from '@/pages/FocusNew';
import NotesPage from '@/pages/Notes';
import NoteNewPage from '@/pages/NoteNew';
import SettingsPage from '@/pages/Settings';
import NotFoundPage from '@/pages/NotFound';
import {
  clearSharePayloadFromLocation,
  parseSharePayload,
  readSharePayloadFromLocation,
} from '@/utils/shareTransfer';

export default function App() {
  const routerBase = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

  useEffect(() => {
    const bootstrap = async () => {
      const sharedPayload = readSharePayloadFromLocation();

      if (sharedPayload) {
        try {
          const backup = await parseSharePayload(sharedPayload);
          const shouldImport = window.confirm(
            'This link contains backup data and will overwrite all existing local data on this device. Continue?',
          );

          if (shouldImport) {
            await importAllData(backup);
          }
        } catch (error) {
          console.error(error);
          window.alert('The shared backup link could not be imported.');
        } finally {
          clearSharePayloadFromLocation();
        }
      }

      await seedDatabase();
    };

    bootstrap().catch(console.error);
  }, []);

  return (
    <BrowserRouter basename={routerBase === '/' ? undefined : routerBase}>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/logs" element={<LogsPage />} />
          <Route path="/logs/new" element={<NewLogPage />} />
          <Route path="/logs/:id" element={<LogDetailPage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/focus" element={<FocusPage />} />
          <Route path="/focus/new" element={<FocusNewPage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/notes/new" element={<NoteNewPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
