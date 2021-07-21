import { Documentation } from '@models/Documentation.model';

let breadCroumb = [];

export const searchBreadCrump = (
    tree: Documentation[],
    page: string,
    path: string[] = []
): string[] => {
    if (path.includes(page)) {
        breadCroumb = path;
        return;
    } else if (!tree?.length) {
        return null;
    }
    tree.forEach((item) => {
        const newPath = [...path, item.urlTitle];
        searchBreadCrump(item.dotcmsdocumentationchildren, page, newPath);
    });
    return breadCroumb;
};
