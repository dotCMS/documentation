import { useState, useEffect } from 'react';

interface PaginationLenghtReturn {
    pageStart: number;
    buttonCount: number[];
    loaded: boolean;
}
export const PaginationLenght = ({
    totalPages,
    paginationLimit,
    page
}: {
    totalPages: number;
    paginationLimit: number;
    page: number;
}): PaginationLenghtReturn => {
    const [buttonCount, setButtonCount] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const pageStart = PaginationStart(page, totalPages, paginationLimit);

    useEffect(() => {
        const pagEnd = totalPages > paginationLimit ? paginationLimit : totalPages;
        setButtonCount(new Array(pagEnd).fill(0));
        setLoaded(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return {
        pageStart,
        buttonCount,
        loaded
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
