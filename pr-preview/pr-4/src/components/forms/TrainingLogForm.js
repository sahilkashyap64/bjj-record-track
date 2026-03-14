import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useMemo, useState } from 'react';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { Chip } from '@/components/common/Chip';
import { FormField, TextArea, TextInput } from '@/components/forms/FormField';
import { InjuryListEditor } from '@/components/forms/InjuryListEditor';
import { RatingInput } from '@/components/forms/RatingInput';
import { ResourceListEditor } from '@/components/forms/ResourceListEditor';
import { SegmentedControl } from '@/components/forms/SegmentedControl';
import { StepperInput } from '@/components/forms/StepperInput';
import { TagInput } from '@/components/forms/TagInput';
import { improvementPrompts, wentWellPrompts } from '@/db/schema';
const sessionTypes = [
    { label: 'Class', value: 'regular_class' },
    { label: 'Private', value: 'private_class' },
    { label: 'Open Mat', value: 'open_mat' },
    { label: 'Seminar', value: 'seminar' },
    { label: 'Other', value: 'other' },
];
const metrics = [
    'submissions',
    'taps',
    'escapes',
    'sweeps',
    'takedowns',
    'guardPasses',
];
export function TrainingLogForm({ initialValue, submitLabel, onSubmit, onDelete, onDuplicate, }) {
    const [value, setValue] = useState(initialValue);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const isValid = useMemo(() => Boolean(value.sessionDate && value.durationMinutes > 0 && value.totalRolls >= 0), [value]);
    const update = (key, next) => setValue((current) => ({ ...current, [key]: next }));
    const submit = async () => {
        if (!isValid) {
            setError('Date, duration, and core session details are required.');
            return;
        }
        setSaving(true);
        setError(null);
        try {
            await onSubmit({ ...value, updatedAt: new Date().toISOString() });
        }
        finally {
            setSaving(false);
        }
    };
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs(Card, { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]", children: "Log Mode" }), _jsx(SegmentedControl, { value: value.mode, onChange: (mode) => update('mode', mode), options: [
                                    { label: 'Quick', value: 'quick' },
                                    { label: 'Detailed', value: 'detailed' },
                                ] })] }), _jsxs("div", { className: "grid gap-3 md:grid-cols-2", children: [_jsx(FormField, { label: "Date", children: _jsx(TextInput, { type: "date", value: value.sessionDate, onChange: (e) => update('sessionDate', e.target.value) }) }), _jsx(FormField, { label: "Time", children: _jsx(TextInput, { type: "time", value: value.sessionTime, onChange: (e) => update('sessionTime', e.target.value) }) }), _jsx(FormField, { label: "Instructor", children: _jsx(TextInput, { value: value.instructor, onChange: (e) => update('instructor', e.target.value), placeholder: "Coach name" }) }), _jsx(FormField, { label: "School / Club", children: _jsx(TextInput, { value: value.schoolOrClub, onChange: (e) => update('schoolOrClub', e.target.value), placeholder: "Academy" }) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "text-sm font-semibold", children: "Style" }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Chip, { active: value.gi, onClick: () => update('gi', true), children: "Gi" }), _jsx(Chip, { active: !value.gi, onClick: () => update('gi', false), children: "No-Gi" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "text-sm font-semibold", children: "Session Type" }), _jsx("div", { className: "flex flex-wrap gap-2", children: sessionTypes.map((item) => (_jsx(Chip, { active: value.sessionType === item.value, onClick: () => update('sessionType', item.value), children: item.label }, item.value))) })] }), _jsx(StepperInput, { label: "Duration (minutes)", value: value.durationMinutes, onChange: (next) => update('durationMinutes', next) })] }), _jsxs(Card, { className: "space-y-4", children: [_jsx("div", { className: "text-sm font-semibold", children: "Techniques Learned" }), _jsx(TagInput, { value: value.techniquesLearned, onChange: (next) => update('techniquesLearned', next) })] }), _jsxs(Card, { className: "space-y-4", children: [_jsx("div", { className: "text-sm font-semibold", children: "Endurance" }), _jsxs("div", { className: "grid gap-3 md:grid-cols-2", children: [value.mode === 'detailed' ? (_jsxs(_Fragment, { children: [_jsx(StepperInput, { label: "Total rounds", value: value.totalRounds, onChange: (next) => update('totalRounds', next) }), _jsx(StepperInput, { label: "Total rolls", value: value.totalRolls, onChange: (next) => update('totalRolls', next) }), _jsx(StepperInput, { label: "Round length", value: value.roundLengthMinutes, onChange: (next) => update('roundLengthMinutes', next) }), _jsx(StepperInput, { label: "Rest length", value: value.restLengthMinutes, onChange: (next) => update('restLengthMinutes', next) })] })) : (_jsx(StepperInput, { label: "Total rolls", value: value.totalRolls, onChange: (next) => update('totalRolls', next) })), _jsx(RatingInput, { label: "Cardio", value: value.cardioRating, onChange: (next) => update('cardioRating', next) }), _jsx(RatingInput, { label: "Intensity", value: value.intensityRating, onChange: (next) => update('intensityRating', next) })] })] }), _jsxs(Card, { className: "space-y-4", children: [_jsx("div", { className: "text-sm font-semibold", children: "Performance Stats" }), _jsx("div", { className: "grid gap-3 md:grid-cols-3", children: metrics.map((metric) => (_jsx(StepperInput, { label: metric === 'guardPasses' ? 'Guard passes' : metric[0].toUpperCase() + metric.slice(1), value: value[metric], onChange: (next) => update(metric, next) }, metric))) })] }), _jsxs(Card, { className: "space-y-4", children: [_jsx("div", { className: "text-sm font-semibold", children: "Reflections" }), _jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "flex flex-wrap gap-2", children: wentWellPrompts.map((prompt) => (_jsx(Chip, { active: value.wentWellPrompt === prompt, onClick: () => update('wentWellPrompt', prompt), children: prompt }, prompt))) }), _jsx(TextArea, { value: value.wentWellText, onChange: (e) => update('wentWellText', e.target.value), placeholder: "What went well?" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "flex flex-wrap gap-2", children: improvementPrompts.map((prompt) => (_jsx(Chip, { active: value.improvementPrompt === prompt, onClick: () => update('improvementPrompt', prompt), children: prompt }, prompt))) }), _jsx(TextArea, { value: value.improvementText, onChange: (e) => update('improvementText', e.target.value), placeholder: "What needs improvement?" })] }), _jsx(TextArea, { value: value.additionalNotes, onChange: (e) => update('additionalNotes', e.target.value), placeholder: "Additional notes" })] }), _jsxs(Card, { className: "space-y-4", children: [_jsx("div", { className: "text-sm font-semibold", children: "Resources" }), _jsx(ResourceListEditor, { value: value.resources, onChange: (next) => update('resources', next) })] }), _jsxs(Card, { className: "space-y-4", children: [_jsx("div", { className: "text-sm font-semibold", children: "Injuries" }), _jsx(InjuryListEditor, { value: value.injuries, onChange: (next) => update('injuries', next) })] }), error ? _jsx("div", { className: "text-sm font-medium text-rose-700", children: error }) : null, _jsxs("div", { className: "flex flex-wrap gap-3", children: [_jsx(Button, { onClick: submit, isLoading: saving, children: submitLabel }), onDuplicate ? (_jsx(Button, { variant: "outline", onClick: () => onDuplicate(), children: "Duplicate" })) : null, onDelete ? (_jsx(Button, { variant: "danger", onClick: () => onDelete(), children: "Delete" })) : null] })] }));
}
