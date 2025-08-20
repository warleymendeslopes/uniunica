import { ReactNode } from 'react';

interface GridUniUnicaProps {
    children: ReactNode;
    className?: string;
    cols?: string;
}
export default function GridUniUnica({children, className = '',  cols = 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',}: GridUniUnicaProps) {
    return (
        <div className={`mx-auto max-w-12xl px-6 flex-grow ${className}`}>
            {children}
        </div>
    );
}
