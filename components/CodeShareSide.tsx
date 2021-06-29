import React from 'react';
import classNames from 'classnames';

// Components
import { CodeShareTopics } from '@components/CodeShareTopics';

export const CodeShareSide = (): JSX.Element => {
    return (
        <div className="w-72">
            <h3>Topics</h3>
            <CodeShareTopics />
            <SideShareCode />
        </div>
    );
};

const SideShareCode = (): JSX.Element => {
    const btnClasses = ['mb-2', 'py-2', 'rounded', 'w-full'];
    const btnCodeShare = [...btnClasses, 'bg-red-500', 'text-white'];
    const btnContributor = [
        ...btnClasses,
        'bg-white',
        'border-blue-300',
        'border',
        'text-blue-300'
    ];
    return (
        <div className="bg-blue-100 p-4 px-6 w-full">
            <h3 className="m-0 mb-8 text-blue-400 text-center">
                Have you created code you&apos;d like to share with the dotCMS community?
            </h3>
            <div className="text-sm">
                <button className={classNames(btnCodeShare)}>SHARE YOUR CODE</button>
                <button className={classNames(btnContributor)}>BECOME A CONTRIBUTOR</button>
            </div>
        </div>
    );
};
