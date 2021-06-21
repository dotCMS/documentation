import React, { useState, ReactNode } from 'react';
import classNames from 'classnames';
import styled from 'styled-components';

const Button = styled.button`
    position: absolute;
    top: 1rem;
    right: 0;
`;

export const SideBar = ({ children }: { children: ReactNode }): JSX.Element => {
    const [showSidebar, setShowSidebar] = useState(true);

    const contanerBaseClasses = [
        'bg-white',
        'border-secondary',
        'border-t-0',
        'border',
        'duration-500',
        'md:duration-500',
        'md:transition-width',
        'md:translate-x-0',
        'pt-3',
        'relative',
        'transform',
        'w-72',
        'z-10'
    ];
    const containerOnHideClasses = [...contanerBaseClasses, 'md:w-0', 'translate-x-0'];
    const containerOnShowClasses = [...contanerBaseClasses, '-translate-x-full'];

    const buttonBaseClasses = [
        'bg-gray-100',
        'duration-500',
        'focus:outline-none',
        'h-8',
        'hidden',
        'items-center',
        'md:duration-500',
        'md:flex',
        'pl-3',
        'rounded-l-full',
        'transform',
        'transition-transform',
        'w-8',
        'z-10'
    ];

    // Desktop
    const buttonOnHideDesktopClasses = [
        ...buttonBaseClasses,
        'md:rotate-180',
        'md:translate-x-full'
    ];
    const buttonOnShowDesktopClasses = [...buttonBaseClasses, 'md:rotate-0', 'md:translate-x-0'];

    return (
        <div className={classNames(showSidebar ? containerOnShowClasses : containerOnHideClasses)}>
            <Button
                className={classNames(
                    showSidebar ? buttonOnShowDesktopClasses : buttonOnHideDesktopClasses
                )}
                onClick={() => setShowSidebar(!showSidebar)}
            >
                <i className="border border-purple-300 border-t-0 border-r-2 border-b-2 border-l-0 p-1 inline-block transform rotate-135" />
            </Button>

            <div className="md:overflow-hidden">
                <div className="w-72 pr-2">
                    <div className="ml-6 mt-6">
                        <span className="font-bold text-purple">Overview</span>
                        <nav>{children}</nav>
                    </div>
                </div>
            </div>
        </div>
    );
};
