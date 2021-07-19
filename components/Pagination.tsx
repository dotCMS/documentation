import React, { Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { usePagination } from '@hooks/usePagination';

interface PaginationProps {
    page: number;
    totalPages: number;
    baseUrl?: string;
    updatePage?: Dispatch<SetStateAction<number>>;
    paginationLimit?: number;
}

export const Pagination = ({
    page,
    totalPages,
    baseUrl,
    updatePage,
    paginationLimit = 5
}: PaginationProps): JSX.Element => {
    const router = useRouter();
    const changePage = (page: number) => {
        if (updatePage) {
            updatePage(() => page);
        } else {
            router.push(baseUrl + page);
        }
    };
    const { buttonCount, pageStart } = usePagination({
        totalPages,
        page,
        paginationLimit
    });
    return (
        <ul className="list-none flex justify-center">
            {page > 1 && (
                <PaginationListItem changePage={changePage} currentPage={page} itemPage={page - 1}>
                    <ArrowLeftSVG />
                </PaginationListItem>
            )}
            {buttonCount.length > 0 &&
                buttonCount.map((item, index) => (
                    <PaginationListItem
                        key={index}
                        changePage={changePage}
                        currentPage={page}
                        itemPage={pageStart + index}
                    >
                        <span>{pageStart + index}</span>
                    </PaginationListItem>
                ))}
            {page < totalPages && (
                <PaginationListItem changePage={changePage} currentPage={page} itemPage={page + 1}>
                    <ArrowSVG />
                </PaginationListItem>
            )}
        </ul>
    );
};

const PaginationListItem = ({
    children,
    changePage,
    currentPage,
    itemPage
}: {
    children: JSX.Element;
    changePage: (page: number) => void;
    currentPage: number;
    itemPage: number;
}): JSX.Element => {
    const paginationClasses = [
        'border-gray',
        'border',
        'flex',
        'h-full',
        'items-center',
        'justify-center',
        'no-underline',
        'px-2',
        'py-2',
        'rounded',
        'w-full',
        'focus:outline-none'
    ];
    const paginationClassesActive = ['border-purple-200', 'text-purple-200'];
    return (
        <li className="mr-4 w-8">
            <button
                className={classNames(
                    paginationClasses,
                    itemPage == currentPage && paginationClassesActive
                )}
                onClick={() => changePage(itemPage)}
            >
                {children}
            </button>
        </li>
    );
};

const ArrowSVG = (): JSX.Element => {
    return (
        <svg
            className="flex"
            height="8px"
            viewBox="0 0 103.536 103.536"
            width="8px"
            x="0px"
            y="0px"
        >
            <g>
                <path
                    d="M0.65,91.928c1.221,2.701,3.881,4.3,6.665,4.3c1.006,0,2.029-0.209,3.006-0.65l88.917-40.195
                    c2.688-1.216,4.381-3.925,4.295-6.873c-0.085-2.948-1.934-5.554-4.687-6.609L9.929,7.794C6.17,6.352,1.933,8.23,0.489,12.001
                    c-1.447,3.769,0.438,7.995,4.207,9.44l72.569,27.834L4.299,82.255C0.62,83.92-1.012,88.249,0.65,91.928z"
                />
            </g>
        </svg>
    );
};

const ArrowLeftSVG = (): JSX.Element => {
    return (
        <svg
            className="flex"
            height="8px"
            viewBox="0 0 103.537 103.537"
            width="8px"
            x="0px"
            y="0px"
        >
            <g>
                <g>
                    <path
                        d="M103.048,12.002c-1.445-3.771-5.679-5.649-9.438-4.207L4.692,41.9c-2.753,1.055-4.603,3.662-4.688,6.609
                        c-0.087,2.948,1.608,5.656,4.295,6.872l88.917,40.196c0.978,0.44,2,0.65,3.006,0.65c2.784,0,5.442-1.6,6.665-4.302
                        c1.661-3.678,0.029-8.007-3.648-9.671L26.273,49.277l72.568-27.834C102.61,19.998,104.496,15.771,103.048,12.002z"
                    />
                </g>
            </g>
        </svg>
    );
};
