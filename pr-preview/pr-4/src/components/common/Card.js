import { jsx as _jsx } from "react/jsx-runtime";
export function Card({ children, hoverable = false, className = '', ...props }) {
    return (_jsx("div", { className: `card-base ${hoverable ? 'transition hover:-translate-y-0.5 hover:shadow-md' : ''} ${className}`, ...props, children: children }));
}
