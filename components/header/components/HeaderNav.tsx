import React, { useState } from 'react';
import Link from 'next/link';
import classNames from 'classnames';

export const HeaderNav = (): JSX.Element => {
    const navTitles = [
        { title: 'Documentation', id: 'documentation', link: '/' },
        {
            title: 'Realease & LTS',
            id: 'realease',
            link: '/latest/current-releases'
        },
        { title: 'Code Share', id: 'code_share', link: '/' },
        { title: 'Forums', id: 'forums', link: 'https://groups.google.com/g/dotcms' },
        { title: 'Online Training', id: 'online', link: 'https://dotcms.com/courses/' }
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
    navTitles: { title: string; id: string; link: string }[];
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
                            'py-2 mr-8 inline-block no-i',
                            isActive ? activeClasses : null
                        )}
                    >
                        <Link href={navTitle.link}>
                            <a
                                className="text-white no-underline"
                                onClick={() => setActive(navTitle.id)}
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
