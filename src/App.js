import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
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
import { clearSharePayloadFromLocation, parseSharePayload, readSharePayloadFromLocation, } from '@/utils/shareTransfer';
export default function App() {
    const routerBase = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';
    useEffect(() => {
        const bootstrap = async () => {
            const sharedPayload = readSharePayloadFromLocation();
            if (sharedPayload) {
                try {
                    const backup = await parseSharePayload(sharedPayload);
                    const shouldImport = window.confirm('This link contains backup data and will overwrite all existing local data on this device. Continue?');
                    if (shouldImport) {
                        await importAllData(backup);
                    }
                }
                catch (error) {
                    console.error(error);
                    window.alert('The shared backup link could not be imported.');
                }
                finally {
                    clearSharePayloadFromLocation();
                }
            }
            await seedDatabase();
        };
        bootstrap().catch(console.error);
    }, []);
    return (_jsx(BrowserRouter, { basename: routerBase === '/' ? undefined : routerBase, children: _jsx(Routes, { children: _jsxs(Route, { element: _jsx(AppShell, {}), children: [_jsx(Route, { path: "/", element: _jsx(HomePage, {}) }), _jsx(Route, { path: "/logs", element: _jsx(LogsPage, {}) }), _jsx(Route, { path: "/logs/new", element: _jsx(NewLogPage, {}) }), _jsx(Route, { path: "/logs/:id", element: _jsx(LogDetailPage, {}) }), _jsx(Route, { path: "/stats", element: _jsx(StatsPage, {}) }), _jsx(Route, { path: "/focus", element: _jsx(FocusPage, {}) }), _jsx(Route, { path: "/focus/new", element: _jsx(FocusNewPage, {}) }), _jsx(Route, { path: "/notes", element: _jsx(NotesPage, {}) }), _jsx(Route, { path: "/notes/new", element: _jsx(NoteNewPage, {}) }), _jsx(Route, { path: "/settings", element: _jsx(SettingsPage, {}) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/", replace: true }) })] }) }) }));
}
