export const getDate = (date: string): string => {
    const created = new Date(date);
    return `${created.toLocaleDateString('en-US', { month: 'short' })} ${created.getDay()}, 
    ${created.getFullYear()}`;
};

export const printTags = (tags: string[]): string[] => {
    const lastIndet = tags.length - 1;
    return tags.map((tag, index) => {
        return lastIndet === index ? tag : tag + ', ';
    });
};
