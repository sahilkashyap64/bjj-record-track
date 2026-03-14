import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import { TrainingLogForm } from '@/components/forms/TrainingLogForm';
import { createEmptyLog } from '@/db/schema';
import { useTrainingLogs } from '@/hooks/useTrainingLogs';
export default function NewLogPage() {
    const navigate = useNavigate();
    const { createLog } = useTrainingLogs();
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold", children: "New Training Log" }), _jsx("p", { className: "mt-1 text-sm text-[var(--muted)]", children: "Capture the session while details are still fresh." })] }), _jsx(TrainingLogForm, { initialValue: createEmptyLog(), submitLabel: "Save log", onSubmit: async (value) => {
                    const { id, createdAt, updatedAt, ...payload } = value;
                    void id;
                    void createdAt;
                    void updatedAt;
                    const created = await createLog(payload);
                    navigate(`/logs/${created.id}`);
                } })] }));
}
