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

export const CODE_SHARE_PATHS_QUERY = `
query codeshare {
    CodeshareCollection {
        authorName
        dateCreated
        title
        urlTitle
        seoDescription
    }
}
`;

export const FULL_CODE_SHARE_QUERY = `
query codeshare ($urlTitle: String!) {
    CodeshareCollection(query: $urlTitle) {
        authorName
        code
        company
        dateCreated
        description
        title
        urlTitle
        seoDescription
    }
}`;

export const FULL_PAGE_QUERY = `
query ($urlTitle: String!) {
    DotcmsDocumentationCollection(query: $urlTitle) {
        title
        format
        documentation
        showToc
        dotcmsdocumentationchildren {
            title            
            urlTitle
            dotcmsdocumentationchildren {
                title                    
                urlTitle                                                           
                dotcmsdocumentationchildren {
                    title                            
                    urlTitle                                                                           
                }
            }
        }
    }
}
`;
