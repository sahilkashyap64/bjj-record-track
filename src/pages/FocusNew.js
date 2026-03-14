import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { Chip } from '@/components/common/Chip';
import { ResourceListEditor } from '@/components/forms/ResourceListEditor';
import { createEmptyFocusJourney } from '@/db/schema';
import { useFocusJourneys } from '@/hooks/useFocusJourneys';
export default function FocusNewPage() {
    const navigate = useNavigate();
    const { createFocusJourney } = useFocusJourneys();
    const [journey, setJourney] = useState(createEmptyFocusJourney());
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold", children: "New Focus Journey" }), _jsx("p", { className: "mt-1 text-sm text-[var(--muted)]", children: "Define a technique, a time block, and a rep target." })] }), _jsxs(Card, { className: "space-y-4", children: [_jsx("input", { className: "input-base", placeholder: "Technique name", value: journey.techniqueName, onChange: (e) => setJourney({ ...journey, techniqueName: e.target.value }) }), _jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "text-sm font-semibold", children: "Focus period" }), _jsx("div", { className: "flex flex-wrap gap-2", children: [30, 60, 90].map((days) => (_jsxs(Chip, { active: journey.durationDays === days, onClick: () => setJourney({ ...journey, durationDays: days }), children: [days, " days"] }, days))) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "text-sm font-semibold", children: "Goal reps" }), _jsx("div", { className: "flex flex-wrap gap-2", children: [10, 25, 50, 100].map((reps) => (_jsx(Chip, { active: journey.goalReps === reps, onClick: () => setJourney({ ...journey, goalReps: reps }), children: reps }, reps))) })] }), _jsxs("div", { className: "rounded-[1.5rem] bg-[var(--accent-soft)] p-4 text-sm text-[var(--accent)]", children: ["Milestone preview: ", Math.max(1, Math.floor(journey.goalReps / 5)), " reps every training week."] }), _jsx("textarea", { className: "input-base min-h-32", placeholder: "Game plan notes", value: journey.gamePlanNotes, onChange: (e) => setJourney({ ...journey, gamePlanNotes: e.target.value }) }), _jsx(ResourceListEditor, { value: journey.resources, onChange: (resources) => setJourney({ ...journey, resources }) }), _jsx(Button, { onClick: async () => {
                            await createFocusJourney({
                                techniqueName: journey.techniqueName,
                                durationDays: journey.durationDays,
                                goalReps: journey.goalReps,
                                customStartDate: journey.customStartDate,
                                customEndDate: journey.customEndDate,
                                resources: journey.resources,
                                gamePlanNotes: journey.gamePlanNotes,
                                status: journey.status,
                            });
                            navigate('/focus');
                        }, children: "Save journey" })] })] }));
}
