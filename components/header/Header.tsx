import React, { Dispatch, SetStateAction } from 'react';
import Link from 'next/link';
import classNames from 'classnames';

// Compoments
import { DotcmsLogo } from './components/DotcmsLogo';
import { HamburgerIcon } from './components/HamburgerIcon';
import { HeaderButton } from './components/HeaderButton';
import { HeaderNav } from './components/HeaderNav';
import { HeaderSelect } from './components/HeaderSelect';
import { Search } from './components/Search';
import { TocIcon } from './components/TocIcon';

export const Header = ({
    showSidebar,
    setShowSidebar,
    setShowSideToc
}: {
    showSidebar: boolean;
    setShowSidebar: Dispatch<SetStateAction<boolean>>;
    setShowSideToc: Dispatch<SetStateAction<boolean>>;
}): JSX.Element => {
    const buttonIconMobileBarClasses = ['border-b', 'border-secondary', 'justify-center'];
    const hamburherIcon = ['justify-end'];
    return (
        <header className="bg-purple flex flex-col justify-between h-32 lg:pt-6 lg:flex-row lg:items-start">
            <div className="flex items-center justify-between px-6 min-w-72 h-full lg:items-start lg:pr-0">
                <DotcmsLogo />
                <HeaderButton className={hamburherIcon}>
                    <HamburgerIcon />
                </HeaderButton>
            </div>
            <div className="bg-white flex h-12 justify-center w-full lg:justify-start lg:bg-transparent lg:flex-col lg:h-full">
                <HeaderButton className={buttonIconMobileBarClasses} setShowItem={setShowSidebar}>
                    <i
                        className={classNames(
                            'border-b-2 border-gray-50 border-r-2 inline-block p-1 transform',
                            showSidebar ? '-rotate-45' : 'rotate-135'
                        )}
                    />
                </HeaderButton>
                <Search />
                <HeaderButton className={buttonIconMobileBarClasses} setShowItem={setShowSideToc}>
                    <TocIcon />
                </HeaderButton>
                <nav className="hidden lg:inline-block">
                    <HeaderNav />
                </nav>
            </div>
            <div className="flex-col h-full hidden items-end justify-end w-auto pr-6 lg:flex">
                <HeaderSelect />
                <Link href="https://helpdesk.dotcms.com/">
                    <a className="no-underline pb-2 text-white">Customer Support</a>
                </Link>
            </div>
        </header>
    );
};
