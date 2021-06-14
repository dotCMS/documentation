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
        <header className="md:h-32 bg-purple border-gray-100 content-center flex flex-col justify-between md:flex-row md:h-full md:items-start md:justify-center md:pt-6 md:px-6">
            <div className="flex h-20 justify-between md:h-full md:p-0 md:w-2/12 pt-6 px-6 w-full">
                <DotcmsLogo />
                <HamburgerButton />
            </div>
            <div className="bg-white flex h-12 justify-center lg:justify-start lg:px-0 md:bg-transparent md:flex md:flex-col md:h-full md:px-6 md:w-7/12 w-full">
                <HeaderButtons>
                    <i className="-rotate-45 border border-b-2 border-gray-50 border-l-0 border-r-2 border-t-0 inline-block p-1 transform" />
                </HeaderButtons>
                <Search />
                <HeaderButtons>
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

const HeaderButtons = ({ children }: { children: ReactNode }): JSX.Element => {
    const buttonIconClasses = [
        'border-secondary',
        'border',
        'flex',
        'focus:outline-none',
        'items-center',
        'justify-center',
        'md:hidden'
    ];

    return (
        <button className={classNames('border-l-0 w-1/12', buttonIconClasses)}>{children}</button>
    );
};
