import React from 'react';
import Link from 'next/link';

// Compoments
import DotcmsLogo from './components/DotcmsLogo';
import HamburgerButton from './components/HamburgerIcon';
import HeaderButton from './components/HeaderButton';
import HeaderNav from './components/HeaderNav';
import HeaderSelect from './components/HeaderSelect';
import Search from './components/Search';
import TocIcon from './components/TocIcon';

export const Header = (): JSX.Element => {
    const buttonIconMobileBarClasses = [
        'border-b',
        'border-secondary',
        'items-center',
        'justify-center'
    ];
    const hamburherIcon = ['justify-end'];
    return (
        <header className="bg-purple flex flex-col justify-between h-32 pt-6 lg:flex-row lg:items-start">
            <div className="flex justify-between px-6 min-w-72 lg:pr-0">
                <DotcmsLogo />
                <HeaderButton className={hamburherIcon}>
                    <HamburgerButton />
                </HeaderButton>
            </div>
            <div className="bg-white flex h-12 justify-center w-full lg:justify-start lg:bg-transparent lg:flex-col lg:h-full">
                <HeaderButton className={buttonIconMobileBarClasses}>
                    <i className="-rotate-45 border-b-2 border-gray-50 border-r-2 inline-block p-1 transform" />
                </HeaderButton>
                <Search />
                <HeaderButton className={buttonIconMobileBarClasses}>
                    <TocIcon />
                </HeaderButton>
                <nav className="hidden lg:inline-block">
                    <HeaderNav />
                </nav>
            </div>
            <div className="flex-col h-full hidden items-end justify-end w-auto pr-6 lg:flex">
                <HeaderSelect />
                <Link href="#">
                    <a className="no-underline pb-2 text-white">Customer Support</a>
                </Link>
            </div>
        </header>
    );
};
