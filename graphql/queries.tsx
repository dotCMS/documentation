export const NAVIGATION_MENU_QUERY = `
    query {
        DotcmsDocumentationCollection(
            query: "+urlMap:/docs/latest/table-of-contents"
        ) {
            title
            navTitle
            urlMap
            dotcmsdocumentationchildren {
                title
                navTitle
                urlMap
                dotcmsdocumentationchildren {
                    title
                    navTitle
                    urlMap

                    dotcmsdocumentationchildren {
                        title
                        navTitle
                        urlMap

                        dotcmsdocumentationchildren {
                            title
                            navTitle
                            urlMap
                        }
                    }
                }
            }
        }
    }
`;
