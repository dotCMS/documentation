import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { SearchIcon } from './SearchIcon';

export const Search = (): JSX.Element => {
    const focusOnSearch = () => searchInput.current.focus();
    const [search, setSearch] = useState('');
    const router = useRouter();
    const searchInput = useRef(null);
    const handlerInput = ({ target }) => setSearch(target.value);
    const handlerSubmit = (e) => {
        e.preventDefault();
        if (search.trim().length) {
            router.push(`/search-results/?search=${search}&page=1`);
        }
    };
    return (
        <form
            className="bg-white border border-secondary flex h-full items-center justify-start max-w-auto mb-auto px-1 py-1.5 rounded-none w-full lg:h-auto lg:max-w-3xl lg:rounded lg:w-10/12"
            onClick={focusOnSearch}
            onSubmit={handlerSubmit}
        >
            <button
                className="bg-transparent flex focus:outline-none items-center z-10"
                type="submit"
                onClick={focusOnSearch}
            >
                <SearchIcon />
            </button>
            <input
                ref={searchInput}
                autoComplete={'off'}
                className="h-4 outline-none p-0.5 pl-4 text-gray-500-secondary w-full"
                placeholder="Search documentation..."
                type="text"
                onInput={handlerInput}
            />
        </form>
    );
};
