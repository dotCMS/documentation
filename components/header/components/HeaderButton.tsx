import React, { ReactNode } from 'react';
import classNames from 'classnames';

const HeaderButton = ({
    children,
    mobileBarClasses = false
}: {
    children: ReactNode;
    mobileBarClasses?: boolean;
}): JSX.Element => {
    const buttonIconClasses = ['flex', 'focus:outline-none', 'md:hidden'];
    const buttonIconMobileBarClasses = [
        'items-center',
        'justify-center',
        'border-secondary',
        'border'
    ];
    return (
        <button
            className={classNames(
                'border-l-0 w-1/12',
                buttonIconClasses,
                mobileBarClasses ? buttonIconMobileBarClasses : null
            )}
        >
            {children}
        </button>
    );
};

export default HeaderButton;
