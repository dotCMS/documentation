import React, { ReactNode } from 'react';

export const CodeShareSide = ({ children }: { children: ReactNode }): JSX.Element => {
    return (
        <aside>
            <h3 className="text-2xl">Topics</h3>
            {children}
        </aside>
    );
};
