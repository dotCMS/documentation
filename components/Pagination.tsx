import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';

interface PaginationProps {
    baseUrl: string;
    page: number;
    search: string;
    totalCount: number;
    postPerPage: number;
}
export const Pagination = ({
    baseUrl,
    page,
    search,
    totalCount,
    postPerPage
}: PaginationProps): JSX.Element => {
    const buttonClasses = [
        'bg-white',
        'border-gray',
        'border',
        'mr-2',
        'no-underline',
        'px-2',
        'py-2',
        'rounded',
        'focus:outline-none'
    ];
    const totalCountPage = page * postPerPage;
    return (
        <>
            {page > 1 ? (
                <Link href={`${baseUrl}/${search}/${page - 1}`}>
                    <a className={classNames(buttonClasses)}>Previous</a>
                </Link>
            ) : null}
            {totalCountPage < totalCount ? (
                <Link href={`${baseUrl}/${search}/${page + 1}`}>
                    <a className={classNames(buttonClasses)}>Next</a>
                </Link>
            ) : null}
        </>
    );
};
