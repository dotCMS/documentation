import React from 'react';
import Link from 'next/link';
import Search from './components/Search';
import HeaderNav from './components/HeaderNav';
import DotcmsLogo from './components/DotcmsLogo';
import HeaderSelect from './components/HeaderSelect';

export const Header = (): JSX.Element => {
    return (
        <header className="pt-6 px-6 bg-purple h-32">
            <div className="h-full flex justify-left md:justify-center items-start border-gray-100">
                <div className="w-2/12">
                    <DotcmsLogo />
                </div>
                <div className="hidden px-4 lg:px-0 h-full flex-col justify-center md:flex lg:justify-start w-7/12">
                    <Search />
                    <div className="hidden md:inline-block">
                        <HeaderNav />
                    </div>
                </div>
                <div className="hidden h-full md:flex flex-col justify-end items-end w-3/12">
                    <HeaderSelect />
                    <Link href="/customer">
                        <a className="text-white no-underline py-2">Customer Support</a>
                    </Link>
                </div>
            </div>
        </header>
    );
};
