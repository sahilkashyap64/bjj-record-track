import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from 'react';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { clearAllData, exportAllData, importAllData } from '@/db/repository';
import { useSettings } from '@/hooks/useSettings';
export default function SettingsPage() {
    const { settings, save } = useSettings();
    const fileRef = useRef(null);
    const downloadBackup = async () => {
        const payload = await exportAllData();
        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = `mat-log-backup-${new Date().toISOString().slice(0, 10)}.json`;
        anchor.click();
        URL.revokeObjectURL(url);
    };
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold", children: "Settings" }), _jsx("p", { className: "mt-1 text-sm text-[var(--muted)]", children: "Local preferences and backup controls." })] }), _jsxs(Card, { className: "grid gap-3", children: [_jsx("input", { className: "input-base", value: settings.displayName, onChange: (e) => save({ displayName: e.target.value }), placeholder: "Display name" }), _jsxs("select", { className: "input-base", value: settings.beltLevel, onChange: (e) => save({ beltLevel: e.target.value }), children: [_jsx("option", { value: "white", children: "White belt" }), _jsx("option", { value: "blue", children: "Blue belt" }), _jsx("option", { value: "purple", children: "Purple belt" }), _jsx("option", { value: "brown", children: "Brown belt" }), _jsx("option", { value: "black", children: "Black belt" })] }), _jsx("input", { className: "input-base", type: "number", value: settings.weeklyGoal, onChange: (e) => save({ weeklyGoal: Number(e.target.value) || 0 }), placeholder: "Weekly goal" }), _jsx("input", { className: "input-base", type: "number", value: settings.annualTarget ?? '', onChange: (e) => save({ annualTarget: Number(e.target.value) || undefined }), placeholder: "Annual target" }), _jsx("input", { className: "input-base", type: "number", value: settings.preferredRoundLength, onChange: (e) => save({ preferredRoundLength: Number(e.target.value) || 5 }), placeholder: "Preferred round length" })] }), _jsxs(Card, { className: "space-y-3", children: [_jsx("div", { className: "text-sm font-semibold", children: "Backup" }), _jsxs("div", { className: "flex flex-wrap gap-2", children: [_jsx(Button, { variant: "outline", onClick: downloadBackup, children: "Export JSON" }), _jsx(Button, { variant: "outline", onClick: () => fileRef.current?.click(), children: "Import JSON" }), _jsx(Button, { variant: "danger", onClick: async () => {
                                    if (window.confirm('Clear all local data?')) {
                                        await clearAllData();
                                        window.location.reload();
                                    }
                                }, children: "Clear local data" })] }), _jsx("input", { ref: fileRef, type: "file", accept: "application/json", className: "hidden", onChange: async (event) => {
                            const file = event.target.files?.[0];
                            if (!file)
                                return;
                            const text = await file.text();
                            const payload = JSON.parse(text);
                            await importAllData(payload);
                            window.location.reload();
                        } })] }), _jsxs(Card, { className: "space-y-3 border-rose-200 bg-rose-50/70", children: [_jsx("div", { className: "text-sm font-semibold text-rose-800", children: "Start Anew" }), _jsx("p", { className: "text-sm text-rose-700", children: "Remove all logs, notes, focus journeys, and local stats so the app opens as a blank journal." }), _jsx(Button, { variant: "danger", onClick: async () => {
                            if (window.confirm('Delete all existing data and start with a blank journal?')) {
                                await clearAllData();
                                window.location.reload();
                            }
                        }, children: "Delete everything" })] })] }));
}
