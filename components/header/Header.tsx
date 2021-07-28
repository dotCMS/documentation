import React, { useState, Dispatch, SetStateAction } from 'react';
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
    showSideBar,
    showSideButton,
    showTocButton,
    setShowSidebar,
    setShowSideToc
}: {
    showSideBar: boolean;
    showSideButton: boolean;
    showTocButton: boolean;
    setShowSidebar: Dispatch<SetStateAction<boolean>>;
    setShowSideToc: Dispatch<SetStateAction<boolean>>;
}): JSX.Element => {
    const [showNav, setShowNav] = useState(false);
    const buttonIconMobileBarClasses = ['border-b', 'border-secondary', 'justify-center'];
    const hamburgerIcon = ['justify-end'];
    return (
        <header className="bg-purple flex flex-col justify-between h-32 lg:pt-6 lg:flex-row lg:items-start">
            <div className="flex items-center justify-between px-6 min-w-72 h-20 lg:h-full lg:items-start lg:pr-0">
                <Link href="/">
                    <a>
                        <DotcmsLogo />
                    </a>
                </Link>
                <HeaderButton className={hamburgerIcon} setShowItem={setShowNav}>
                    <HamburgerIcon />
                </HeaderButton>
            </div>
            <div className="bg-white flex h-12 justify-center w-full lg:justify-start lg:bg-transparent lg:flex-col lg:h-full">
                {showSideButton && (
                    <HeaderButton
                        className={buttonIconMobileBarClasses}
                        setShowItem={setShowSidebar}
                    >
                        <i
                            className={classNames(
                                'border-b-2 border-gray-50 border-r-2 inline-block p-1 transform',
                                showSideBar ? '-rotate-45' : 'rotate-135'
                            )}
                        />
                    </HeaderButton>
                )}
                <Search />
                {showTocButton && (
                    <HeaderButton
                        className={buttonIconMobileBarClasses}
                        setShowItem={setShowSideToc}
                    >
                        <TocIcon />
                    </HeaderButton>
                )}
                <HeaderNav setShowNav={setShowNav} showNav={showNav} />
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
