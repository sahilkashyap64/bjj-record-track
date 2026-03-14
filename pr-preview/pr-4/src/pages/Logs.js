import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/common/Card';
import { Chip } from '@/components/common/Chip';
import { EmptyState } from '@/components/common/EmptyState';
import { useTrainingLogs } from '@/hooks/useTrainingLogs';
import { sentenceCase } from '@/utils/format';
import { toDisplayDate } from '@/utils/date';
export default function LogsPage() {
    const { logs, loading } = useTrainingLogs();
    const [query, setQuery] = useState('');
    const [giFilter, setGiFilter] = useState('all');
    const [sessionType, setSessionType] = useState('all');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const filtered = useMemo(() => logs.filter((log) => {
        const matchesQuery = query === '' ||
            log.techniquesLearned.some((technique) => technique.name.toLowerCase().includes(query.toLowerCase())) ||
            log.instructor.toLowerCase().includes(query.toLowerCase()) ||
            log.additionalNotes.toLowerCase().includes(query.toLowerCase());
        const matchesGi = giFilter === 'all' || (giFilter === 'gi' ? log.gi : !log.gi);
        const matchesType = sessionType === 'all' || log.sessionType === sessionType;
        const matchesStart = !start || log.sessionDate >= start;
        const matchesEnd = !end || log.sessionDate <= end;
        return matchesQuery && matchesGi && matchesType && matchesStart && matchesEnd;
    }), [logs, query, giFilter, sessionType, start, end]);
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-end justify-between gap-3", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold", children: "Logs" }), _jsx("p", { className: "mt-1 text-sm text-[var(--muted)]", children: "Search and review every session." })] }), _jsx(Link, { to: "/logs/new", className: "text-sm font-semibold text-[var(--accent)]", children: "New log" })] }), _jsxs(Card, { className: "space-y-3", children: [_jsx("input", { className: "input-base", placeholder: "Search logs", value: query, onChange: (e) => setQuery(e.target.value) }), _jsx("div", { className: "flex flex-wrap gap-2", children: ['all', 'gi', 'nogi'].map((item) => (_jsx(Chip, { active: giFilter === item, onClick: () => setGiFilter(item), children: item === 'all' ? 'All styles' : item === 'gi' ? 'Gi' : 'No-Gi' }, item))) }), _jsxs("select", { className: "input-base", value: sessionType, onChange: (e) => setSessionType(e.target.value), children: [_jsx("option", { value: "all", children: "All session types" }), _jsx("option", { value: "regular_class", children: "Regular class" }), _jsx("option", { value: "private_class", children: "Private class" }), _jsx("option", { value: "open_mat", children: "Open mat" }), _jsx("option", { value: "seminar", children: "Seminar" }), _jsx("option", { value: "other", children: "Other" })] }), _jsxs("div", { className: "grid gap-3 md:grid-cols-2", children: [_jsx("input", { className: "input-base", type: "date", value: start, onChange: (e) => setStart(e.target.value) }), _jsx("input", { className: "input-base", type: "date", value: end, onChange: (e) => setEnd(e.target.value) })] })] }), loading ? _jsx(Card, { children: "Loading logs..." }) : null, !loading && filtered.length === 0 ? (_jsx(EmptyState, { title: "No logs match", description: "Try widening your search or create a new session log." })) : null, _jsx("div", { className: "grid gap-3", children: filtered.map((log) => (_jsx(Link, { to: `/logs/${log.id}`, children: _jsxs(Card, { hoverable: true, className: "space-y-3", children: [_jsxs("div", { className: "flex items-start justify-between gap-3", children: [_jsxs("div", { children: [_jsx("div", { className: "text-lg font-semibold", children: toDisplayDate(log.sessionDate) }), _jsxs("div", { className: "text-sm text-[var(--muted)]", children: [log.gi ? 'Gi' : 'No-Gi', " \u00B7 ", sentenceCase(log.sessionType), " \u00B7 ", log.durationMinutes, " min"] })] }), _jsxs("div", { className: "text-sm text-[var(--muted)]", children: [log.techniquesLearned.length, " techniques"] })] }), _jsxs("div", { className: "flex flex-wrap gap-2 text-sm text-slate-700", children: [_jsxs("span", { children: ["Subs ", log.submissions] }), _jsxs("span", { children: ["Taps ", log.taps] }), _jsxs("span", { children: ["Rolls ", log.totalRolls] })] })] }) }, log.id))) })] }));
}
