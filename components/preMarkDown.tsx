import React from 'react';

export const preMarkdown = (props): JSX.Element => {
    return (
        <div className="remark-highlight">
            <pre {...props} />
        </div>
    );
};
