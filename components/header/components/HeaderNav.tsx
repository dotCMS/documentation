import React, { useState } from 'react';
import classNames from 'classnames';

const DotNavHeader = (): JSX.Element => {
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
    return (
        <>
            {navTitles.map((navTitle) => (
                <li
                    key={navTitle.id}
                    className={classNames('py-2 mr-10 inline-block no-i', {
                        'border-b-3': active === navTitle.id,
                        'border-pink': active === navTitle.id,
                        'font-bold': active === navTitle.id
                    })}
                >
                    <a
                        className="text-white no-underline"
                        href="#"
                        onClick={() => setActive(navTitle.id)}
                    >
                        {navTitle.title}
                    </a>
                </li>
            ))}
        </>
    );
};

export default DotNavHeader;
