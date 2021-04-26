import React from 'react';

const DotNavHeader = (): JSX.Element => {
    return (
        <ul className="list-none inline-block">
            <li className="py-2 px-3 active-item">
                <a>Home</a>
            </li>
            <li className="py-2 px-3">
                <a>Realease & LTS</a>
            </li>
            <li className="py-2 px-3">
                <a>Tutorials</a>
            </li>
            <li className="py-2 px-3">
                <a>Forums</a>
            </li>
            <li className="py-2 px-3">
                <a>Online Training</a>
            </li>
        </ul>
    );
};

export default DotNavHeader;
