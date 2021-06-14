import React, { ReactNode } from 'react';
import Link from 'next/link';
import classNames from 'classnames';

// Compoments
import DotcmsLogo from './components/DotcmsLogo';
import HamburgerButton from './components/HamburgerButton';
import HeaderNav from './components/HeaderNav';
import HeaderSelect from './components/HeaderSelect';
import Search from './components/Search';
import TocIcon from './components/TocIcon';

export const Header = (): JSX.Element => {
    return (
        <header className="bg-purple border-gray-100 content-center flex flex-col justify-between md:flex-row md:h-32 md:items-start md:justify-center md:pt-6 md:px-6">
            <div className="flex h-20 justify-between md:h-full md:p-0 md:w-2/12 pt-6 px-6 w-full">
                <DotcmsLogo />
                <HeaderButtons>
                    <HamburgerButton />
                </HeaderButtons>
            </div>
            <div className="bg-white flex h-12 justify-center lg:justify-start lg:px-0 md:bg-transparent md:flex md:flex-col md:h-full md:px-6 md:w-7/12 w-full">
                <HeaderButtons responsiveClasses={true}>
                    <i className="-rotate-45 border border-b-2 border-gray-50 border-l-0 border-r-2 border-t-0 inline-block p-1 transform" />
                </HeaderButtons>
                <Search />
                <HeaderButtons responsiveClasses={true}>
                    <TocIcon />
                </HeaderButtons>
                <nav className="hidden md:inline-blockhidden md:inline-block">
                    <HeaderNav />
                </nav>
            </div>
            <div className="flex-col h-full hidden items-end justify-end md:flex w-3/12">
                <HeaderSelect />
                <Link href="#">
                    <a className="no-underline py-2 text-white">Customer Support</a>
                </Link>
            </div>
        </header>
    );
};

const HeaderButtons = ({
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
