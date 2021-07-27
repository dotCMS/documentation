import { useEffect, useState } from 'react';

interface usePaginationReturn {
    pageStart: number;
    buttonCount: number[];
}

export const usePagination = ({
    totalPages,
    paginationLimit,
    page
}: {
    totalPages: number;
    paginationLimit: number;
    page: number;
}): usePaginationReturn => {
    const [buttonCount, setButtonCount] = useState([]);
    const pageStart = PaginationStart(page, totalPages, paginationLimit);
    useEffect(() => {
        const pagEnd = totalPages > paginationLimit ? paginationLimit : totalPages;
        setButtonCount(Array.from({ length: pagEnd }, () => 0));
    }, [totalPages]);
    return {
        pageStart,
        buttonCount
    };
};

const PaginationStart = (page: number, totalPages: number, limit: number): number => {
    const halfLimit = Math.floor(limit / 2);
    if (totalPagesIsLowerThanLimit(totalPages, limit) || lowerThanHalfLimit(page, halfLimit)) {
        return 1;
    } else if (totalPages - halfLimit > page) {
        return page - halfLimit;
    } else {
        return totalPages - limit + 1;
    }
};

const totalPagesIsLowerThanLimit = (totalPages: number, limit: number): boolean => {
    return totalPages < limit;
};

const lowerThanHalfLimit = (page: number, halfLimit: number): boolean => {
    return page <= halfLimit;
};
