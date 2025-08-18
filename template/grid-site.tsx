import { ReactNode } from 'react';

interface GridUniUnicaProps {
    children: ReactNode;
    className?: string;
    cols?: string;
}

export default function GridSite({
                                         children,
                                         className = '',
                                         cols = 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
                                     }: GridUniUnicaProps) {
    return (
        <div className={`container mx-auto max-w-6xl pt-16 px-6 flex-grow ${className}`}>
            <div className={`grid ${cols} gap-6`}>
                {children}
            </div>
        </div>
    );
}
