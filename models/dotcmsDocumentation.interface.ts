export interface DotcmsDocumentation {
    title: string;
    navTitle: string | null;
    urlMap: string;
    dotcmsdocumentationchildren?: DotcmsDocumentation[];
}

export interface NavigationProp {
    props: {
        data: DotcmsDocumentation[];
    };
}
