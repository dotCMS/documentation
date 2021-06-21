import React, { useState } from 'react';
import classNames from 'classnames';

export const HeaderNav = (): JSX.Element => {
    const navTitles = [
        { title: 'Documentation', id: 'documentation' },
        { title: 'Realease & LTS', id: 'realease' },
        { title: 'Code Share', id: 'code_share' },
        { title: 'Forums', id: 'forums' },
        { title: 'Online Training', id: 'online' }
    ];
    return (
        <ul className="list-none p-0 m-0">
            <DotNavItem navTitles={navTitles} />
        </ul>
    );
};

const DotNavItem = ({ navTitles }: { navTitles: { title: string; id: string }[] }): JSX.Element => {
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
                        <a
                            className="text-white no-underline"
                            href="#"
                            onClick={() => setActive(navTitle.id)}
                        >
                            {navTitle.title}
                        </a>
                    </li>
                );
            })}
        </>
    );
};
