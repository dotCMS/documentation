import React from 'react';

const HeaderSelect = (): JSX.Element => {
    return (
        <div className="flex items-center bg-white rounded w-40 h-8 text-xs border border-secondary text-gray">
            <label className="select-label inline-flex relative w-full h-full items-center">
                <span className="relative font-bold text-sm w-16 z-0 pl-2">Version:</span>
                <select className="text-indent-64 text-sm appearance-none bg-transparent z-10 cursor-pointer -ml-16 border-0 rounded focus:outline-none w-full h-full">
                    <option>Lastest</option>
                    <option>v8.2.1</option>
                    <option>v7.2.1</option>
                </select>
            </label>
        </div>
    );
};

export default HeaderSelect;
