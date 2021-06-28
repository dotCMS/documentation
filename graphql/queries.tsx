// DOCUMENTATION QUERY
export const NAVIGATION_MENU_QUERY = `
    query {
        DotcmsDocumentationCollection(
            query: "+urlMap:/docs/latest/table-of-contents"
        ) {
            urlMap
            urlTitle                                
            dotcmsdocumentationchildren {                                
                urlMap
                urlTitle                            
                dotcmsdocumentationchildren {                        
                    urlMap
                    urlTitle                                                        
                    dotcmsdocumentationchildren {                                
                        urlMap
                        urlTitle                                                                    
                        dotcmsdocumentationchildren {                                        
                            urlMap
                            urlTitle                                                                                
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

// CODESHARE QUERY
export const CODE_SHARE_PATHS_QUERY = `
query codeshare {
    CodeshareCollection {
        title
        urlTitle
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

export const CODE_SHARE_QUERY_LIST_ARTICULES = `
query codeshare($offset: Int!) {
    CodeshareCollection(
        limit: 10,
        offset: $offset
    ) {
        authorName
        dateCreated
        title
        urlTitle
        seoDescription
    }
}`;

export const CODE_SHARE_QUERY_LIST_TAGS = `
query codeshare($tags: String!) {
    CodeshareCollection(
        query: $tags 
    ) {
        authorName
        dateCreated
        title
        urlTitle
        seoDescription
    }
}`;
