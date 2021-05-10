import React, { useState, ReactNode } from 'react';
import classNames from 'classnames';

const SideBar = ({ children }: { children: ReactNode }): JSX.Element => {
    const [showSidebar, setShowSidebar] = useState(true);

    const containerOnHideClasses = ['md:w-0', 'translate-x-0'];
    const containerOnShowClasses = ['-translate-x-full'];

    // Mobile
    const buttonOnShowMobileClasses = ['rotate-0', 'translate-x-0'];
    const buttonOnHideMobileClasses = ['rotate-180', 'translate-x-full'];
    // Desktop
    const buttonOnHideDesktopClasses = ['md:rotate-180', 'md:translate-x-full'];
    const buttonOnShowDesktopClasses = ['md:rotate-0', 'md:translate-x-0'];
    return (
        <div
            className={classNames(
                'bg-white border border-t-0 border-secondary z-50 w-72 pt-3 transform md:translate-x-0 md:transition-width duration-500 md:duration-500 relative',
                showSidebar ? containerOnShowClasses : containerOnHideClasses
            )}
        >
            <div className="flex justify-end">
                <button
                    className={classNames(
                        'bg-gray bg-transparent flex items-center h-8 pl-3 w-8 z-10 rounded-l-full transform transition-transform duration-500 md:duration-500 focus:outline-none',
                        showSidebar ? buttonOnShowDesktopClasses : buttonOnHideDesktopClasses,
                        showSidebar ? buttonOnHideMobileClasses : buttonOnShowMobileClasses
                    )}
                    onClick={() => setShowSidebar(!showSidebar)}
                >
                    <i className="border border-purple border-t-0 border-r-2 border-b-2 border-l-0 p-1 inline-block transform rotate-135" />
                </button>
            </div>
            <div className="overflow-auto ml-6">
                <span className="text-sm font-bold text-purple">Overview</span>
                <nav className="text-gray-200">{children}</nav>
            </div>
        </div>
    );
};

export default SideBar;
