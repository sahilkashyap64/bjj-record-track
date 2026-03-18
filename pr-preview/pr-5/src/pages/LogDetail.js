import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { TrainingLogForm } from '@/components/forms/TrainingLogForm';
import { useTrainingLogs } from '@/hooks/useTrainingLogs';
export default function LogDetailPage() {
    const { id = '' } = useParams();
    const navigate = useNavigate();
    const { getLogById, updateLog, deleteLog, duplicateLog } = useTrainingLogs();
    const [log, setLog] = useState(null);
    useEffect(() => {
        getLogById(id).then((item) => setLog(item ?? null)).catch(console.error);
    }, [getLogById, id]);
    if (!log) {
        return (_jsxs("div", { className: "space-y-4", children: [_jsx(Link, { to: "/logs", className: "text-sm text-[var(--accent)]", children: "Back to logs" }), _jsx("div", { className: "card-base", children: "Log not found." })] }));
    }
    return (_jsxs("div", { className: "space-y-4", children: [_jsx(Link, { to: "/logs", className: "text-sm text-[var(--accent)]", children: "Back to logs" }), _jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold", children: "Edit Log" }), _jsx("p", { className: "mt-1 text-sm text-[var(--muted)]", children: "Update the session, duplicate it, or remove it." })] }), _jsx(TrainingLogForm, { initialValue: log, submitLabel: "Update log", onSubmit: async (value) => {
                    await updateLog(id, value);
                    navigate('/logs');
                }, onDelete: async () => {
                    await deleteLog(id);
                    navigate('/logs');
                }, onDuplicate: async () => {
                    const copy = await duplicateLog(id);
                    if (copy)
                        navigate(`/logs/${copy.id}`);
                } })] }));
}
