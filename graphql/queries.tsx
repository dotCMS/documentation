export const NAVIGATION_MENU_QUERY = `
    query {
        DotcmsDocumentationCollection(
            query: "+urlMap:/docs/latest/table-of-contents"
        ) {
            title
            navTitle
            urlMap
            urlTitle
            format
            documentation
            dotcmsdocumentationchildren {
                title
                navTitle
                urlMap
                urlTitle
                format
                documentation
                dotcmsdocumentationchildren {
                    title
                    navTitle
                    urlMap
                    urlTitle
                    format
                    documentation

                    dotcmsdocumentationchildren {
                        title
                        navTitle
                        urlMap
                        urlTitle
                        format
                        documentation

                        dotcmsdocumentationchildren {
                            title
                            navTitle
                            urlMap
                            urlTitle
                            format
                            documentation
                        }
                    }
                }
            }
        }
    }
`;

export const FULL_PAGE_QUERY = `
query ($urlTitle: String!) {
    DotcmsDocumentationCollection(query: $urlTitle) {
      title
      format
      documentation
    }
}
`;
