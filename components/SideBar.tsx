import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import classNames from 'classnames';

const SideBar = ({
    children,
    hide,
    updateHide
}: {
    children: ReactNode;
    hide: boolean;
    updateHide: Dispatch<SetStateAction<boolean>>;
}): JSX.Element => {
    return (
        <div
            className={classNames('border border-t-0 border-secondary p-6 pt-4 relative', {
                'w-4': hide,
                'w-72': !hide
            })}
        >
            <div className="flex justify-end">
                <button
                    className="focus:outline-none flex items-center bg-transparent z-10 w-5 h-5"
                    onClick={() => updateHide(!hide)}
                >
                    <i
                        className={classNames(
                            'border border-gray border-t-0 border-r-2 border-b-2 border-l-0 inline-block p-1 transform rotate-135 transition-all duration-500',
                            {
                                'rotate-315': hide
                            }
                        )}
                    />
                </button>
            </div>
            {!hide && (
                <>
                    <span className="text-sm font-bold text-purple">Overview</span>
                    <nav className="text-gray-200">{children}</nav>
                </>
            )}
        </div>
    );
};

export default SideBar;
