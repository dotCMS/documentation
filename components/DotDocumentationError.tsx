import Anser from 'anser';
import * as React from 'react';

import DocumentationErrors from '@styles/DotDocumentationError.styles';

export type TerminalProps = { content: string };

export const Terminal: React.FC<TerminalProps> = function Terminal({
    content
}: {
    content: string;
}) {
    const decoded = React.useMemo(() => {
        return Anser.ansiToJson(content, {
            json: true,
            use_classes: true,
            remove_empty: true
        });
    }, [content]);

    return (
        <DocumentationErrors>
            <pre>
                {decoded.map((entry, index) => (
                    <span
                        key={`terminal-entry-${index}`}
                        style={{
                            color: entry.fg ? `var(--color-${entry.fg})` : undefined,
                            ...(entry.decoration === 'bold'
                                ? { fontWeight: 800 }
                                : entry.decoration === 'italic'
                                ? { fontStyle: 'italic' }
                                : undefined)
                        }}
                    >
                        {entry.content}
                    </span>
                ))}
            </pre>
        </DocumentationErrors>
    );
};
