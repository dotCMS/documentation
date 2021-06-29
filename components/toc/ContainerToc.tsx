import React, { ReactNode } from 'react';
import classNames from 'classnames';

export const ContainerToc = ({
    children,
    showSideToc
}: {
    children: ReactNode;
    showSideToc: boolean;
}): JSX.Element => {
    return (
        <div
            className={classNames(
                'border-l bg-white overflow-auto px-3 transform -translate-x-full w-72 lg:block lg:border-0 lg:translate-x-0 lg:w-64',
                showSideToc ? 'block' : 'hidden'
            )}
        >
            <h4 className="my-6 mx-3 text-lg">On this Page</h4>
            <span className="block mb-2 mx-3 font-bold">Overview</span>
            {children}
        </div>
    );
};
