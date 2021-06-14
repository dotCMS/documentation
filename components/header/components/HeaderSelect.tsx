import React from 'react';

const HeaderSelect = (): JSX.Element => {
    return (
        <div className="flex items-center mb-auto bg-white rounded w-48 h-8 border border-secondary text-gray-500">
            <label className="select-label inline-flex relative w-full h-full items-center">
                <span className="relative font-bold w-16 pl-4 text-black">Version:</span>
                <select className="appearance-none bg-transparent cursor-pointer -ml-16 border-0 rounded focus:outline-none w-full h-full text-indent-64">
                    <option>Lastest</option>
                    <option>v8.2.1</option>
                    <option>v7.2.1</option>
                </select>
            </label>
        </div>
    );
};

export default HeaderSelect;
