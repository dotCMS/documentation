import React from 'react';
import Link from 'next/link';

export const LinkMarkdown = (props: { href: string; children: string }): JSX.Element => {
    return props.href ? (
        <>
            {props.href.startsWith('#') || props.href.startsWith('http') ? (
                <a className="break-words" href={props.href}>
                    {props.children}
                </a>
            ) : (
                <Link href={props.href}>
                    <a>{props.children}</a>
                </Link>
            )}
        </>
    ) : (
        <a className="break-words">{props.children}</a>
    );
};
