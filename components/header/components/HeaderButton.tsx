import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { Dispatch } from 'react';
import { SetStateAction } from 'react';

export const HeaderButton = ({
    children,
    className = [],
    setShowItem
}: {
    children: ReactNode;
    className?: string[];
    setShowItem?: Dispatch<SetStateAction<boolean>>;
}): JSX.Element => {
    const buttonIconClasses = [
        'flex',
        'items-center',
        'focus:outline-none',
        'lg:hidden',
        'w-12',
        'h-12'
    ];
    return setShowItem ? (
        <button
            className={classNames(buttonIconClasses, className)}
            onClick={() => setShowItem((state) => !state)}
        >
            {children}
        </button>
    ) : (
        <button className={classNames(buttonIconClasses, className)}>{children}</button>
    );
};
