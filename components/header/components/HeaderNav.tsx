import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import classNames from 'classnames';

export const HeaderNav = (): JSX.Element => {
    const navTitles = [
        { title: 'Documentation', link: '/' },
        { title: 'Realease & LTS', link: '/latest/current-releases' },
        { title: 'Code Share', link: '/codeshare' },
        { title: 'Forums', link: 'https://groups.google.com/g/dotcms' },
        { title: 'Online Training', link: 'https://dotcms.com/courses/' }
    ];
    return (
        <ul className="list-none p-0 m-0">
            <DotNavItem navTitles={navTitles} />
        </ul>
    );
};

const DotNavItem = ({
    navTitles
}: {
    navTitles: { title: string; link: string }[];
}): JSX.Element => {
    const router = useRouter();
    const [activeRoute, setActiveRoute] = useState<string>();
    useEffect(() => {
        const curretPath = router.asPath;
        const possibleRoutes =
            curretPath.includes('/latest/current-releases') || curretPath.includes('/codeshare');
        possibleRoutes ? setActiveRoute(router.asPath) : setActiveRoute('/');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const activeClasses = ['border-b-3', 'border-pink', 'font-bold'];
    return (
        <>
            {navTitles.map((navTitle) => {
                const isActive = activeRoute === navTitle.link;
                return (
                    <li
                        key={navTitle.link}
                        className={classNames(
                            'py-2 mr-8 inline-block no-i',
                            isActive ? activeClasses : null
                        )}
                    >
                        <Link href={navTitle.link}>
                            <a
                                className="text-white no-underline"
                                onClick={() => setActiveRoute(navTitle.link)}
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
