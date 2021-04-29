import React, { ReactNode } from 'react';

const SideBar = ({ children }: { children: ReactNode }): JSX.Element => {
    return (
        <div className="border border-secondary p-8 pt-4 w-72 max-w-72">
            <div className="flex justify-end">
                <button className="focus:outline-none flex items-center bg-transparent z-10">
                    <i className="border border-gray border-t-0 border-r-2 border-b-2 border-l-0 inline-block p-1 transform rotate-135" />
                </button>
            </div>
            <span className="text-sm font-bold text-purple">Overview</span>
            <nav className="text-gray-200">{children}</nav>
        </div>
    );
};

export default SideBar;
