import React from 'react';
import SearchIcon from './SearchIcon';

const Search = (): JSX.Element => {
    const focusOnSearch = () => document.getElementById('search').focus();
    return (
        <div
            className="bg-white border border-secondary flex h-full items-center justify-start mb-auto px-1 py-1.5 rounded-none w-full lg:h-auto lg:rounded lg:w-10/12"
            onClick={focusOnSearch}
        >
            <button
                className="bg-transparent flex focus:outline-none items-center z-10"
                onClick={focusOnSearch}
            >
                <SearchIcon />
            </button>
            <input
                className="h-4 outline-none p-0.5 pl-4 text-gray-500-secondary w-full"
                id="search"
                placeholder="Search documentation..."
                type="text"
            />
        </div>
    );
};

export default Search;
