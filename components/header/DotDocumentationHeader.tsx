import React from 'react';
import DotSearchHeader from './components/DotSearchHeader';
import HeaderNav from './components/HeaderNav';
import DotcmsLogo from './components/DotcmsLogo';

export const Header = (): JSX.Element => {
    return (
        <header className="pt-4 px-6 bg-header">
            <div className="flex justify-center items-center mb-5">
                <div className="w-2/12">
                    <DotcmsLogo />
                </div>
                <div className="flex w-7/12">
                    <DotSearchHeader />
                </div>
                <div className="flex justify-end items-center w-3/12">
                    <div className="flex items-center bg-white rounded w-40 h-8 text-xs border border-secondary text-gray pl-4">
                        <span className="font-bold text-sm">Version:</span>
                        <select className="focus:outline-none w-1/2">
                            <option>value</option>
                        </select>
                    </div>
                </div>
            </div>
            <div>
                <HeaderNav />
            </div>
        </header>
    );
};
