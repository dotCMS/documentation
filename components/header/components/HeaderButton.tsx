import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { Dispatch } from 'react';
import { SetStateAction } from 'react';

const HeaderButton = ({
    children,
    className = [],
    showItem,
    setShowItem
}: {
    children: ReactNode;
    className?: string[];
    showItem?: boolean;
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
            onClick={() => setShowItem(!showItem)}
        >
            {children}
        </button>
    ) : (
        <button className={classNames(buttonIconClasses, className)}>{children}</button>
    );
};

export default HeaderButton;
