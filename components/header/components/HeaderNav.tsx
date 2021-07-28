import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';
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
        'py-4',
        'text-right',
        'lg:bg-transparent',
        'lg:flex-row',
        'lg:py-0'
    ];
    const navTitles = [
        { title: 'Documentation', pathName: 'documentation', link: '/' },
        { title: 'Realease & LTS', pathName: 'current-releases', link: '/current-releases' },
        { title: 'Code Share', pathName: 'codeshare', link: '/codeshare' },
        { title: 'Forums', pathName: 'forums', link: 'https://groups.google.com/g/dotcms' },
        { title: 'Online Training', pathName: 'training', link: 'https://dotcms.com/courses/' }
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
    navTitles: { title: string; pathName: string; link: string }[];
    setShowNav: Dispatch<SetStateAction<boolean>>;
}): JSX.Element => {
    const router = useRouter();
    const [activeRoute, setActiveRoute] = useState<string>();
    useEffect(() => {
        const possiblePaths = ['current-releases', 'codeshare'];
        const currentPath = router.asPath.replace('/latest', '').split('/')[1];
        possiblePaths.includes(currentPath)
            ? setActiveRoute(currentPath)
            : setActiveRoute('documentation');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const activeClasses = ['border-b-3', 'border-pink', 'font-bold'];
    return (
        <>
            {navTitles.map((navTitle) => {
                const isActive = activeRoute === navTitle.pathName;
                return (
                    <li
                        key={navTitle.pathName}
                        className={classNames(
                            'inline-block my-2 mr-8 py-2 lg:my-0',
                            isActive ? activeClasses : null
                        )}
                    >
                        <Link href={navTitle.link}>
                            <a
                                className="text-black no-underline text-3xl lg:text-base lg:text-white"
                                onClick={() => {
                                    setActiveRoute(navTitle.pathName);
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
