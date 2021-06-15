import React, { ReactNode } from 'react';
import classNames from 'classnames';

const HeaderButton = ({
    children,
    className = []
}: {
    children: ReactNode;
    className?: string[];
}): JSX.Element => {
    const buttonIconClasses = ['flex', 'focus:outline-none', 'lg:hidden', 'w-12', 'h-12'];
    return <button className={classNames(buttonIconClasses, className)}>{children}</button>;
};

export default HeaderButton;
