import React, { ReactNode, Dispatch } from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import { SetStateAction } from 'react';

const Button = styled.button`
    position: fixed;
    top: 1.5rem;
`;

const SideNav = styled.div`
    /* Viewport height - header - top div - border*/
    height: calc(100vh - 8rem - 6rem - 2px);
`;

export const SideBar = ({
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
        'border-secondary',
        'border-t-0',
        'border',
        'duration-500',
        'relative',
        'transform',
        'w-72',
        'z-10',
        'lg:duration-500',
        'lg:transition-width',
        'lg:translate-x-0'
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
        'pl-3',
        'rounded-full',
        'transform',
        'transition-transform',
        'w-8',
        'z-10',
        'lg:duration-500',
        'lg:flex'
    ];

    // Desktop
    const buttonOnHideDesktopClasses = [
        ...buttonBaseClasses,
        'right-0',
        'lg:rotate-180',
        'lg:translate-x-full'
    ];
    const buttonOnShowDesktopClasses = [
        ...buttonBaseClasses,
        'right-6',
        'lg:rotate-0',
        'lg:translate-x-0'
    ];

    return (
        <aside
            className={classNames(showSidebar ? containerOnShowClasses : containerOnHideClasses)}
        >
            <Button
                className={classNames(
                    showSidebar ? buttonOnShowDesktopClasses : buttonOnHideDesktopClasses
                )}
                onClick={() => setShowSidebar(!showSidebar)}
            >
                <i className="border-b-2 border-gray-100 border-r-2 inline-block p-1 rotate-135 transform" />
            </Button>
            <div className="overflow-hidden">
                <div className="border-b border-secondary flex flex-col h-24 items-start justify-center pl-6 py-3 w-72">
                    <h4 className="m-0 mb-2 text-gray-150">Documentation</h4>
                    <span className="text-xs">dotCMS User Guide</span>
                </div>
                <SideNav className="overflow-y-auto p-6 pb-0 pr-2 w-72">
                    <nav>{children}</nav>
                </SideNav>
            </div>
        </aside>
    );
};
