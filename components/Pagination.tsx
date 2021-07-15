import React, { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';

// Helper
import { PaginationLenght } from '@helpers/pagination';

interface PaginationProps {
    page: number;
    totalCount: number;
    baseUrl?: string;
    state?: Dispatch<SetStateAction<number>>;
    paginationLimit?: number;
    postPerPage?: number;
}

export const Pagination = ({
    baseUrl,
    page,
    totalCount,
    state,
    paginationLimit = 5,
    postPerPage = 10
}: PaginationProps): JSX.Element => {
    const router = useRouter();
    const changePage = (page) => {
        if (state) {
            state(() => page);
        } else {
            router.push(baseUrl + page);
        }
    };
    // Classes
    const buttonClasses = [
        'border',
        'border-gray',
        'flex',
        'justify-center',
        'no-underline',
        'px-2',
        'py-2',
        'rounded',
        'focus:outline-none'
    ];
    const buttonClassesActive = ['border-purple-200', 'text-purple-200'];
    const arrowButtons = ['w-full', 'h-full', 'flex', 'items-center'];
    const leftArrowClasses = ['transform', 'rotate-180'];
    // Pagination
    const totalPages = Math.ceil(totalCount / postPerPage);
    const { buttonCount, pagStart } = PaginationLenght({
        totalPages,
        page,
        paginationLimit
    });
    return (
        <ul className="list-none flex justify-center">
            {page > 1 && (
                <li className="mr-4 w-8">
                    <button
                        className={classNames(buttonClasses, arrowButtons)}
                        onClick={() => changePage(page - 1)}
                    >
                        <ArrowSVG className={leftArrowClasses} />
                    </button>
                </li>
            )}
            {buttonCount.map((item, index) => {
                const pagNumber = pagStart + index;
                return (
                    <li key={index} className="mr-4 w-8">
                        <button
                            className={classNames(
                                buttonClasses,
                                page == pagNumber && buttonClassesActive
                            )}
                            onClick={() => changePage(pagNumber)}
                        >
                            {pagNumber}
                        </button>
                    </li>
                );
            })}
            {page < totalPages && (
                <li className="mr-4 w-8">
                    <button
                        className={classNames(buttonClasses, arrowButtons)}
                        onClick={() => changePage(page + 1)}
                    >
                        <ArrowSVG />
                    </button>
                </li>
            )}
        </ul>
    );
};

const ArrowSVG = ({ className }: { className?: string[] }): JSX.Element => {
    return (
        <svg
            className={classNames('flex', className)}
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
