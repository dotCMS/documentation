import React from 'react';

// Components
import { Terminal } from '@components/PageRenderError';

export const PageError = ({ title, error }: { title: string; error: string }): JSX.Element => {
    return (
        <main className="container flex flex-col flex-grow mx-auto px-16 overflow-auto">
            <h1>{title}</h1>
            <Terminal content={error} />
        </main>
    );
};
