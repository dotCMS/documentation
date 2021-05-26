import React from 'react';
import Search from './components/Search';
import HeaderNav from './components/HeaderNav';
import DotcmsLogo from './components/DotcmsLogo';
import Dropdown from './components/Dropdown';

export const Header = (): JSX.Element => {
    return (
        <header className="pt-4 px-6 bg-header border-b border-secondary">
            <div className="flex justify-left md:justify-center items-center mb-5">
                <div className="w-2/12">
                    <DotcmsLogo />
                </div>
                <div className="hidden justify-center md:flex lg:justify-start w-7/12">
                    <Search />
                </div>
                <div className="hidden md:flex justify-end items-center w-3/12">
                    <Dropdown />
                </div>
            </div>
            <div className="hidden md:inline-block">
                <HeaderNav />
            </div>
        </header>
    );
};
