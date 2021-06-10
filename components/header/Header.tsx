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
            <div className="pt-6 px-6 bg-purple h-20 md:h-full flex justify-between content-center md:justify-center md:items-start border-gray-100">
                <div className="w-2/12">
                    <DotcmsLogo />
                </div>
                <div className="hidden px-4 lg:px-0 h-full flex-col justify-center md:flex lg:justify-start w-7/12">
                    <Search className="rounded" />
                    <nav className="hidden md:inline-block">
                        <HeaderNav />
                    </nav>
                </div>
                <div className="hidden h-full md:flex flex-col justify-end items-end w-3/12">
                    <HeaderSelect />
                    <Link href="/customer">
                        <a className="text-white no-underline py-2">Customer Support</a>
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
