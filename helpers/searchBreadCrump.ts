import { Documentation } from '@models/Documentation.model';

let breadCroumb = [];

export const searchBreadCrumb = (
    tree: Documentation[],
    page: string,
    path: string[] = []
): string[] => {
    if (path.includes(page)) {
        breadCroumb = path;
        return;
    } else if (!tree?.length) {
        return [];
    }
    tree.forEach((item) => {
        const newPath = [...path, item.urlTitle];
        searchBreadCrumb(item.dotcmsdocumentationchildren, page, newPath);
    });
    return breadCroumb;
};
