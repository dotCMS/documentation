import React, { ReactNode } from 'react';
import classNames from 'classnames';

export const CodeShareSide = ({ children }: { children: ReactNode }): JSX.Element => {
    return (
        <aside className="w-72">
            <h3 className="text-2xl">Topics</h3>
            {children}
            <SideShareCode />
        </aside>
    );
};

const SideShareCode = (): JSX.Element => {
    const btnClasses = [
        'mb-2',
        'no-underline',
        'px-1',
        'py-2',
        'rounded',
        'text-center',
        'w-full',
        'focus:outline-none'
    ];
    const btnCodeShare = [...btnClasses, 'bg-red-500', 'text-white'];
    const btnContributor = [
        ...btnClasses,
        'bg-white',
        'border-blue-300',
        'border',
        'text-blue-300'
    ];
    return (
        <div className="bg-blue-100 p-4 px-5 rounded w-full">
            <h3 className="m-0 mb-8 text-blue-400 text-center">
                Have you created code you&apos;d like to share with the dotCMS community?
            </h3>
            <div className="text-sm flex flex-col">
                <a
                    className={classNames(btnCodeShare)}
                    href="https://dotcms.com/codeshare/submit-code"
                >
                    SHARE YOUR CODE
                </a>
                <a
                    className={classNames(btnContributor)}
                    href="https://dotcms.com/codeshare/submit-code"
                >
                    BECOME A CONTRIBUTOR
                </a>
            </div>
        </div>
    );
};
