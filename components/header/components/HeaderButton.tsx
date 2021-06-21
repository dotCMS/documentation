import React, { ReactNode } from 'react';
import classNames from 'classnames';

export const HeaderButton = ({
    children,
    className = []
}: {
    children: ReactNode;
    className?: string[];
}): JSX.Element => {
    const buttonIconClasses = [
        'flex',
        'items-center',
        'focus:outline-none',
        'lg:hidden',
        'w-12',
        'h-12'
    ];
    return <button className={classNames(buttonIconClasses, className)}>{children}</button>;
};
