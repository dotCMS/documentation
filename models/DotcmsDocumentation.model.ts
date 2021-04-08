export interface DotcmsDocumentation {
    title: string;
    navTitle: string | null;
    urlMap: string;
    urlTitle: string;
    dotcmsdocumentationchildren?: DotcmsDocumentation[];
}
