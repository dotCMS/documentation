// DOCUMENTATION QUERY
export const NAVIGATION_MENU_QUERY = `
    query {
        DotcmsDocumentationCollection(
            query: "+urlMap:/docs/latest/table-of-contents"
        ) {
            urlTitle
            title
            navTitle
            dotcmsdocumentationchildren {                                    
                urlTitle
                title
                navTitle
                dotcmsdocumentationchildren {                                
                    urlTitle
                    title
                    navTitle                         
                    dotcmsdocumentationchildren {                                            
                        urlTitle
                        title
                        navTitle                                         
                        dotcmsdocumentationchildren {                                                        
                            urlTitle
                            title
                            navTitle                                             
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
    CodeshareCollection(
        limit: 100000000
    ) {
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

export const CODE_SHARE_QUERY_LIST_ARTICLES = `
query codeshare($offset: Int!; $tags: String!) {
    CodeshareCollection(
        limit: 10,
        query: $tags,
        offset: $offset
    ) {
        authorName
        dateCreated
        title
        urlTitle
        seoDescription
    }
}`;

export const CODE_SHARE_QUERY_TOTAL_COUNT = `
query codeshare($tags: String!) {
    CodeshareCollection(
        query: $tags,
        limit: 1000000
    ){
    	urlTitle
  	}
  	QueryMetadata {
      totalCount
    }
}`;
