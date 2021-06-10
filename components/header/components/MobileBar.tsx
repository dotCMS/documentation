import React from 'react';
import Search from './Search';

const MobileBar = (): JSX.Element => {
    return (
        <div className="flex md:hidden w-full h-12">
            <button className="w-1/12 border border-secondary border-r-0 focus:outline-none">
                <i className="border border-gray-50 border-t-0 border-r-2 border-b-2 border-l-0 p-1 inline-block transform -rotate-45" />
            </button>
            <div className="w-10/12">
                <Search className="h-full" />
            </div>
            <button className="w-1/12 border border-secondary border-l-0 focus:outline-none">
                <i className="border border-purple-300 border-t-0 border-r-2 border-b-2 border-l-0 p-1 inline-block transform rotate-135" />
            </button>
        </div>
    );
};

export default MobileBar;
