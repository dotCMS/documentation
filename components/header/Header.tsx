import React from 'react';
import Search from './components/Search';
import HeaderNav from './components/HeaderNav';
import DotcmsLogo from './components/DotcmsLogo';
import HeaderSelect from './components/HeaderSelect';

export const Header = (): JSX.Element => {
    return (
        <header className="pt-4 px-6 bg-header border-b">
            <div className="flex justify-left md:justify-center items-center mb-5 border-gray-100">
                <div className="w-2/12">
                    <DotcmsLogo />
                </div>
                <div className="hidden justify-center md:flex lg:justify-start w-7/12">
                    <Search />
                </div>
                <div className="hidden md:flex justify-end items-center w-3/12">
                    <HeaderSelect />
                </div>
            </div>
            <div className="hidden md:inline-block">
                <HeaderNav />
            </div>
        </header>
    );
};
