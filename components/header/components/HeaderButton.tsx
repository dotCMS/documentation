import React, { ReactNode } from 'react';
import classNames from 'classnames';

const HeaderButton = ({
    children,
    responsiveClasses = false
}: {
    children: ReactNode;
    responsiveClasses?: boolean;
}): JSX.Element => {
    const buttonIconClasses = ['flex', 'focus:outline-none', 'md:hidden'];
    const buttonIconResponsiveClasses = [
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
                responsiveClasses ? buttonIconResponsiveClasses : null
            )}
        >
            {children}
        </button>
    );
};

export default HeaderButton;
