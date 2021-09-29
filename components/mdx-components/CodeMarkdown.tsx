import React from 'react';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import github from 'prism-react-renderer/themes/github';

export const CodeMarkdown = ({
    children,
    className
}: {
    children: string;
    className: string;
}): JSX.Element => {
    const language: Language = (className
        ? className.replace(/language-/, '')
        : 'unknown') as Language;
    return (
        <>
            {children.length ? (
                <Highlight {...defaultProps} code={children} language={language} theme={github}>
                    {({ className, style, tokens, getLineProps, getTokenProps }) => (
                        <div
                            className={className}
                            style={{ ...style, padding: '20px 20px 0 20px' }}
                        >
                            <code>
                                {tokens.map((line, i) => (
                                    <div key={i} {...getLineProps({ line, key: i })}>
                                        {line.map((token, key) => (
                                            <span key={key} {...getTokenProps({ token, key })} />
                                        ))}
                                    </div>
                                ))}
                            </code>
                        </div>
                    )}
                </Highlight>
            ) : (
                <code>{children}</code>
            )}
        </>
    );
};
