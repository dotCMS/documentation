import React from 'react';

const DotNavHeader = (): JSX.Element => {
    return (
        <ul className="list-none p-0">
            <li className="py-2 px-2 mr-5 font-bold inline-block active-item">
                <a href="#">Home</a>
            </li>
            <li className="py-2 px-2 mr-5 font-bold text-gray inline-block">
                <a href="#">Realease & LTS</a>
            </li>
            <li className="py-2 px-2 mr-5 font-bold text-gray inline-block">
                <a href="#">Tutorials</a>
            </li>
            <li className="py-2 px-2 mr-5 font-bold text-gray inline-block">
                <a href="#">Forums</a>
            </li>
            <li className="py-2 px-2 mr-5 font-bold text-gray inline-block">
                <a href="#">Online Training</a>
            </li>
        </ul>
    );
};

export default DotNavHeader;
