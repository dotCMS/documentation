export const PaginationLenght = ({ totalPages, paginationLimit, page }) => {
    const pagStart = PaginationStart(page, totalPages, paginationLimit);
    const pagEnd = totalPages > paginationLimit ? paginationLimit : totalPages;
    const buttonCount = new Array(pagEnd).fill(0);

    return {
        pagStart,
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
