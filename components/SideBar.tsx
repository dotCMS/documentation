import React, { useState, ReactNode } from 'react';
import classNames from 'classnames';

const SideBar = ({ children }: { children: ReactNode }): JSX.Element => {
    const [show, updateShow] = useState(true);
    const [showMovil, updateShowMovil] = useState(false);
    return (
        <div
            className={classNames(
                'bg-white border border-t-0 border-secondary w-72 z-50 pl-6 w-72 pt-3 transform transition-transform md:translate-x-0 md:transition-width duration-500 md:duration-500 relative',
                {
                    '-translate-x-full': !showMovil,
                    'translate-x-0': showMovil,
                    'md:w-0': !show,
                    'md:pl-0': !show
                }
            )}
        >
            <div className="flex justify-end">
                <button
                    className={classNames(
                        'bg-gray bg-transparent flex items-center h-8 pl-3 w-8 z-10 rounded-l-full transform transition-transform duration-500 md:duration-500 focus:outline-none',
                        {
                            'rotate-180': !showMovil,
                            'translate-x-full': !showMovil,
                            'rotate-0': showMovil,
                            'translate-x-0': showMovil,
                            'md:rotate-180': !show,
                            'md:translate-x-full': !show,
                            'md:rotate-0': show,
                            'md:translate-x-0': show
                        }
                    )}
                    onClick={() => {
                        updateShow(!show);
                        updateShowMovil(!showMovil);
                    }}
                >
                    <i className="border border-purple border-t-0 border-r-2 border-b-2 border-l-0 p-1 inline-block transform rotate-135" />
                </button>
            </div>
            <div className="overflow-hidden">
                <span className="text-sm font-bold text-purple">Overview</span>
                <nav className="text-gray-200">{children}</nav>
            </div>
        </div>
    );
};

export default SideBar;
