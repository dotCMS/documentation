import React, { ReactNode } from 'react';
import classNames from 'classnames';

const HeaderButton = ({
    children,
    className = []
}: {
    children: ReactNode;
    className?: string[];
}): JSX.Element => {
    const buttonIconClasses = ['flex', 'focus:outline-none', 'md:hidden'];
    return (
        <button className={classNames('border-l-0 w-1/12', buttonIconClasses, className)}>
            {children}
        </button>
    );
};

export default HeaderButton;
