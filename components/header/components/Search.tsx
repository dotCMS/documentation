import React from 'react';
import SearchIcon from './SearchIcon';

const Search = (): JSX.Element => {
    const focusOnSearch = () => document.getElementById('search').focus();
    return (
        <div
            className="bg-white border border-secondary rounded h-9 flex justify-start items-center w-full py-1.5 px-1 search-documentation mb-auto"
            onClick={focusOnSearch}
        >
            <button
                className="focus:outline-none flex items-center bg-transparent z-10"
                onClick={focusOnSearch}
            >
                <SearchIcon />
            </button>
            <input
                className="p-0.5 w-4/5 h-4 text-gray-500-secondary outline-none pl-4"
                id="search"
                placeholder="Search documentation..."
                type="text"
            />
        </div>
    );
};

export default Search;
