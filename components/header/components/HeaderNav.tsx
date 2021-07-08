import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import classNames from 'classnames';

export const HeaderNav = (): JSX.Element => {
    const navTitles = [
        { title: 'Documentation', pathName: 'documentation', link: '/' },
        { title: 'Realease & LTS', pathName: 'current-releases', link: '/latest/current-releases' },
        { title: 'Code Share', pathName: 'codeshare', link: '/codeshare' },
        { title: 'Forums', pathName: 'forums', link: 'https://groups.google.com/g/dotcms' },
        { title: 'Online Training', pathName: 'training', link: 'https://dotcms.com/courses/' }
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
    navTitles: { title: string; pathName: string; link: string }[];
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
    }, [router.asPath]);
    const activeClasses = ['border-b-3', 'border-pink', 'font-bold'];
    return (
        <>
            {navTitles.map((navTitle) => {
                const isActive = activeRoute === navTitle.pathName;
                return (
                    <li
                        key={navTitle.pathName}
                        className={classNames(
                            'py-2 mr-8 inline-block no-i',
                            isActive ? activeClasses : null
                        )}
                    >
                        <Link href={navTitle.link}>
                            <a
                                className="text-white no-underline"
                                onClick={() => setActiveRoute(navTitle.pathName)}
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
