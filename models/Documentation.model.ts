export interface Documentation {
    title: string;
    navTitle: string | null;
    urlMap: string;
    urlTitle: string;
    navOnly: boolean[];
    format: string;
    documentation: string;
    dotcmsdocumentationchildren?: Documentation[];
}
