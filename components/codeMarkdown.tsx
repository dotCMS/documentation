import React, { useEffect } from 'react';
import Prism from 'prismjs';

export const codeMarkdown = (props): JSX.Element => {
    useEffect(() => {
        Prism.highlightAll();
    }, []);
    return <code className="language-shell">{props.children}</code>;
};
