import React from 'react';

const DotNavHeader = (): JSX.Element => {
    const navTitles = ['Home', 'Realease & LTS', 'Tutorials', 'Forums', 'Online Training'];
    return (
        <ul className="list-none p-0">
            {navTitles.map((title, index) => (
                <DotNavItem key={index} title={title} />
            ))}
        </ul>
    );
};

const DotNavItem = ({ title }: { title: string }): JSX.Element => {
    return (
        <li className="py-2 px-2 mr-5 font-bold inline-block">
            <a href="#">{title}</a>
        </li>
    );
};

export default DotNavHeader;
