import React, { useState } from 'react';
import classNames from 'classnames';

const DotNavHeader = (): JSX.Element => {
    const navTitles = [
        { title: 'Home', id: 'home' },
        { title: 'Realease & LTS', id: 'realease' },
        { title: 'Tutorials', id: 'tutorials' },
        { title: 'Forums', id: 'forums' },
        { title: 'Online Training', id: 'online' }
    ];
    return (
        <ul className="list-none p-0">
            <DotNavItem navTitles={navTitles} />
        </ul>
    );
};

const DotNavItem = ({ navTitles }: { navTitles: { title: string; id: string }[] }): JSX.Element => {
    const [active, setActive] = useState('home');
    return (
        <>
            {navTitles.map((navTitle) => (
                <li
                    key={navTitle.id}
                    className={classNames('py-2 px-2 mr-5 font-bold inline-block', {
                        'text-purple': active === navTitle.id,
                        'border-b-2': active === navTitle.id,
                        'border-primary': active === navTitle.id
                    })}
                >
                    <a href="#" onClick={() => setActive(navTitle.id)}>
                        {navTitle.title}
                    </a>
                </li>
            ))}
        </>
    );
};

export default DotNavHeader;
