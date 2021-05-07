import React, { useState, ReactNode } from 'react';
import classNames from 'classnames';

const SideBar = ({ children }: { children: ReactNode }): JSX.Element => {
    const [show, updateShow] = useState(false);
    return (
        <div
            className={classNames(
                'bg-white border border-t-0 z-50 md:translate-x-0 border-secondary w-72 pl-6 pt-3 transform transition-transform duration-500 relative',
                {
                    '-translate-x-full': !show,
                    'translate-x-0': show
                }
            )}
        >
            <div className="flex justify-end">
                <button
                    className={classNames(
                        'bg-gray bg-transparent h-8 pl-3 w-8 z-10 rounded-l-full flex items-center transform transition-transform duration-500 focus:outline-none',
                        {
                            'rotate-180': !show,
                            'translate-x-full': !show,
                            'rotate-0': show,
                            'translate-x-0': show
                        }
                    )}
                    onClick={() => updateShow(!show)}
                >
                    <i className="border border-purple border-t-0 border-r-2 border-b-2 border-l-0 p-1 inline-block transform rotate-135" />
                </button>
            </div>
            <div className="pr-4">
                <span className="text-sm font-bold text-purple">Overview</span>
                <nav className="text-gray-200">{children}</nav>
            </div>
        </div>
    );
};

export default SideBar;
