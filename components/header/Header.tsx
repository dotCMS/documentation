import React from 'react';
import Link from 'next/link';
import Search from './components/Search';
import HeaderNav from './components/HeaderNav';
import DotcmsLogo from './components/DotcmsLogo';
import HeaderSelect from './components/HeaderSelect';
import MobileBar from './components/MobileBar';
import HamburgerButton from './components/HamburgerButton';

export const Header = (): JSX.Element => {
    return (
        <header className="md:h-32">
            <div className="bg-purple border-gray-100 content-center flex h-20 justify-between md:h-full md:items-start md:justify-center pt-6 px-6">
                <div className="w-2/12">
                    <DotcmsLogo />
                </div>
                <div className="flex-col h-full hidden justify-center lg:justify-start lg:px-0 md:flex px-6 w-7/12">
                    <Search className="rounded" />
                    <nav className="hidden md:inline-block">
                        <HeaderNav />
                    </nav>
                </div>
                <div className="flex-col h-full hidden items-end justify-end md:flex w-3/12">
                    <HeaderSelect />
                    <Link href="#">
                        <a className="no-underline py-2 text-white">Customer Support</a>
                    </Link>
                </div>
                <div>
                    <HamburgerButton />
                </div>
            </div>
            <MobileBar />
        </header>
    );
};
