import { useState, useRef } from 'react';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import type { ExportPayload } from '@/types';
import { clearAllData, exportAllData, importAllData } from '@/db/repository';
import { useSettings } from '@/hooks/useSettings';
import { buildShareUrl } from '@/utils/shareTransfer';

export default function SettingsPage() {
  const { settings, save } = useSettings();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [shareUrl, setShareUrl] = useState('');
  const [shareError, setShareError] = useState('');

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

  const generateShareLink = async () => {
    try {
      setShareError('');
      const payload = await exportAllData();
      const url = await buildShareUrl(payload);
      setShareUrl(url);
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
      }
    } catch (error) {
      console.error(error);
      setShareError(error instanceof Error ? error.message : 'Could not generate share link.');
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">Local preferences and backup controls.</p>
      </div>
      <Card className="grid gap-3">
        <input className="input-base" value={settings.displayName} onChange={(e) => save({ displayName: e.target.value })} placeholder="Display name" />
        <select className="input-base" value={settings.beltLevel} onChange={(e) => save({ beltLevel: e.target.value as typeof settings.beltLevel })}>
          <option value="white">White belt</option>
          <option value="blue">Blue belt</option>
          <option value="purple">Purple belt</option>
          <option value="brown">Brown belt</option>
          <option value="black">Black belt</option>
        </select>
        <input
          className="input-base"
          type="number"
          value={settings.weeklyGoal}
          onChange={(e) => save({ weeklyGoal: Number(e.target.value) || 0 })}
          placeholder="Weekly goal"
        />
        <input
          className="input-base"
          type="number"
          value={settings.annualTarget ?? ''}
          onChange={(e) => save({ annualTarget: Number(e.target.value) || undefined })}
          placeholder="Annual target"
        />
        <input
          className="input-base"
          type="number"
          value={settings.preferredRoundLength}
          onChange={(e) => save({ preferredRoundLength: Number(e.target.value) || 5 })}
          placeholder="Preferred round length"
        />
      </Card>
      <Card className="space-y-3">
        <div className="text-sm font-semibold">Backup</div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={downloadBackup}>
            Export JSON
          </Button>
          <Button variant="outline" onClick={() => fileRef.current?.click()}>
            Import JSON
          </Button>
          <Button
            variant="danger"
            onClick={async () => {
              if (window.confirm('Clear all local data?')) {
                await clearAllData();
                window.location.reload();
              }
            }}
          >
            Clear local data
          </Button>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={async (event) => {
            const file = event.target.files?.[0];
            if (!file) return;
            const text = await file.text();
            const payload = JSON.parse(text) as ExportPayload;
            await importAllData(payload);
            window.location.reload();
          }}
        />
      </Card>
      <Card className="space-y-3">
        <div className="text-sm font-semibold">Transfer by Link</div>
        <p className="text-sm text-[var(--muted)]">
          Create a compressed shareable link for moving your journal to a new phone. Opening the link will prompt to
          overwrite the local data on that device.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={generateShareLink}>
            Generate share link
          </Button>
          {shareUrl ? (
            <Button
              variant="ghost"
              onClick={async () => {
                if (navigator.clipboard) {
                  await navigator.clipboard.writeText(shareUrl);
                }
              }}
            >
              Copy link
            </Button>
          ) : null}
        </div>
        {shareError ? <div className="text-sm text-rose-700">{shareError}</div> : null}
        {shareUrl ? (
          <div className="space-y-2">
            <div className="rounded-2xl border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
              Warning: importing from this link overwrites existing local data on the destination device.
            </div>
            <textarea className="input-base min-h-28" readOnly value={shareUrl} />
          </div>
        ) : null}
      </Card>
      <Card className="space-y-3 border-rose-200 bg-rose-50/70">
        <div className="text-sm font-semibold text-rose-800">Start Anew</div>
        <p className="text-sm text-rose-700">
          Remove all logs, notes, focus journeys, and local stats so the app opens as a blank journal.
        </p>
        <Button
          variant="danger"
          onClick={async () => {
            if (window.confirm('Delete all existing data and start with a blank journal?')) {
              await clearAllData();
              window.location.reload();
            }
          }}
        >
          Delete everything
        </Button>
      </Card>
    </div>
  );
}
