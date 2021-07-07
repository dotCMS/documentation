import React, { useState, Dispatch, SetStateAction } from 'react';
import Link from 'next/link';
import classNames from 'classnames';

export const HeaderNav = ({
    setShowNav,
    showNav
}: {
    setShowNav: Dispatch<SetStateAction<boolean>>;
    showNav: boolean;
}): JSX.Element => {
    const navHiddeClasses = ['hidden', 'lg:flex'];
    const navClasses = [
        'absolute',
        'bg-black',
        'bg-opacity-50',
        'h-mobile-nav',
        'w-full',
        'z-10',
        'lg:bg-transparent',
        'lg:h-auto',
        'lg:static'
    ];
    const navList = [
        'bg-white',
        'flex-col',
        'flex',
        'items-end',
        'list-none',
        'm-0',
        'p-0',
        'text-right',
        'lg:bg-transparent',
        'lg:flex-row'
    ];
    const navTitles = [
        { title: 'Documentation', id: 'documentation', link: '/' },
        { title: 'Realease & LTS', id: 'realease', link: '/latest/current-releases' },
        { title: 'Code Share', id: 'code_share', link: '/codeshare' },
        { title: 'Forums', id: 'forums', link: 'https://groups.google.com/g/dotcms' },
        { title: 'Online Training', id: 'online', link: 'https://dotcms.com/courses/' }
    ];
    return (
        <nav className={classNames(showNav ? navClasses : navHiddeClasses)}>
            <ul className={classNames(navList)}>
                <DotNavItem navTitles={navTitles} setShowNav={setShowNav} />
            </ul>
        </nav>
    );
};

const DotNavItem = ({
    navTitles,
    setShowNav
}: {
    navTitles: { title: string; id: string; link: string }[];
    setShowNav: Dispatch<SetStateAction<boolean>>;
}): JSX.Element => {
    const [active, setActive] = useState('documentation');
    const activeClasses = ['border-b-3', 'border-pink', 'font-bold'];
    return (
        <>
            {navTitles.map((navTitle) => {
                const isActive = active === navTitle.id;
                return (
                    <li
                        key={navTitle.id}
                        className={classNames(
                            'inline-block my-2 mr-8 py-2 lg:my-0',
                            isActive ? activeClasses : null
                        )}
                    >
                        <Link href={navTitle.link}>
                            <a
                                className="text-black no-underline text-3xl lg:text-base lg:text-white"
                                onClick={() => {
                                    setActive(navTitle.id);
                                    setShowNav(false);
                                }}
                            >
                                {navTitle.title}
                            </a>
                        </Link>
                    </li>
                );
            })}
        </>
    );
};
