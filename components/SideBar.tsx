import React, { ReactNode, Dispatch } from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import { SetStateAction } from 'react';

const Button = styled.button`
    position: fixed;
    top: 1.5rem;
`;

const SideNav = styled.div`
    height: calc(100vh - 8rem - 6rem - 1px);
`;

const SideBar = ({
    children,
    showSidebar,
    setShowSidebar
}: {
    children: ReactNode;
    showSidebar: boolean;
    setShowSidebar: Dispatch<SetStateAction<boolean>>;
}): JSX.Element => {
    const contanerBaseClasses = [
        'bg-white',
        'border',
        'border-secondary',
        'border-t-0',
        'duration-500',
        'relative',
        'transform',
        'w-72',
        'lg:duration-500',
        'lg:transition-width',
        'lg:translate-x-0',
        'z-10'
    ];
    const containerOnHideClasses = [...contanerBaseClasses, 'lg:w-0', 'translate-x-0'];
    const containerOnShowClasses = [...contanerBaseClasses, '-translate-x-full'];

    const buttonBaseClasses = [
        'bg-gray-75',
        'duration-500',
        'focus:outline-none',
        'h-8',
        'hidden',
        'items-center',
        'lg:duration-500',
        'lg:flex',
        'pl-3',
        'rounded-full',
        'transform',
        'transition-transform',
        'w-8',
        'z-10'
    ];

    // Desktop
    const buttonOnHideDesktopClasses = [
        ...buttonBaseClasses,
        'lg:rotate-180',
        'lg:translate-x-full',
        'right-0'
    ];
    const buttonOnShowDesktopClasses = [
        ...buttonBaseClasses,
        'lg:rotate-0',
        'lg:translate-x-0',
        'right-6'
    ];

    return (
        <div className={classNames(showSidebar ? containerOnShowClasses : containerOnHideClasses)}>
            <Button
                className={classNames(
                    showSidebar ? buttonOnShowDesktopClasses : buttonOnHideDesktopClasses
                )}
                onClick={() => setShowSidebar(!showSidebar)}
            >
                <i className="border border-gray-100 border-t-0 border-r-2 border-b-2 border-l-0 p-1 inline-block transform rotate-135" />
            </Button>
            <div className="overflow-hidden">
                <div className="w-72 flex flex-col justify-center items-start h-24 pl-6 py-3 border-b border-secondary">
                    <h4 className="m-0 mb-2 text-gray">Documentation</h4>
                    <span className="text-xs">dotCMS User Guide</span>
                </div>
                <SideNav className="w-72 p-6 pr-2 pb-0 overflow-auto">
                    <span className="text-sm font-bold text-purple">Overview</span>
                    <nav className="text-gray-200">{children}</nav>
                </SideNav>
            </div>
        </div>
    );
};

export default SideBar;
