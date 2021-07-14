export interface Documentation {
    title: string;
    navTitle: string | null;
    urlMap: string;
    urlTitle: string;
    showToc: boolean[];
    format: string;
    documentation: string;
    dotcmsdocumentationchildren?: Documentation[];
}

export interface SearchResultItem {
    title: string;
    urlTitle: string;
    authorName?: string;
    dateCreated?: string;
    seoDescription?: string;
}
