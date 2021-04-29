export interface Documentation {
    title: string;
    navTitle: string | null;
    urlMap: string;
    urlTitle: string;
    format: string;
    documentation: string;
    dotcmsdocumentationchildren?: Documentation[];
}