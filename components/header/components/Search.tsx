import React from 'react';
import SearchIcon from './SearchIcon';

const Search = (): JSX.Element => {
    const focusOnSearch = () => document.getElementById('search').focus();
    return (
        <div
            className="bg-white border border-secondary flex h-full items-center justify-start mb-auto md:h-auto md:rounded px-1 py-1.5 rounded-none search-documentation w-10/12 w-full"
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
