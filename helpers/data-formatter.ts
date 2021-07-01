export const getDate = (date: string): string => {
    const created = new Date(date);
    return `${created.toLocaleDateString('en-US', { month: 'short' })} ${created.getDay()}, 
    ${created.getFullYear()}`;
};
