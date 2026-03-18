import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from 'react';
import { Chip } from '@/components/common/Chip';
import { createId, techniqueLibrary } from '@/db/schema';
export function TagInput({ value, onChange }) {
    const [query, setQuery] = useState('');
    const suggestions = useMemo(() => techniqueLibrary.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()) &&
        !value.some((selected) => selected.name === item.name)), [query, value]);
    const addCustom = () => {
        const trimmed = query.trim();
        if (!trimmed)
            return;
        onChange([...value, { id: createId(), name: trimmed, category: 'other' }]);
        setQuery('');
    };
    return (_jsxs("div", { className: "space-y-3", children: [_jsx("input", { value: query, onChange: (event) => setQuery(event.target.value), placeholder: "Search or add a technique", className: "input-base" }), _jsx("div", { className: "flex flex-wrap gap-2", children: value.map((item) => (_jsx(Chip, { onClick: () => onChange(value.filter((selected) => selected.id !== item.id)), children: item.name }, item.id))) }), _jsxs("div", { className: "flex flex-wrap gap-2", children: [suggestions.slice(0, 8).map((item) => (_jsx(Chip, { onClick: () => onChange([...value, item]), children: item.name }, item.id))), query.trim() && !suggestions.some((item) => item.name.toLowerCase() === query.toLowerCase()) ? (_jsxs(Chip, { active: true, onClick: addCustom, children: ["Add \"", query.trim(), "\""] })) : null] })] }));
}
