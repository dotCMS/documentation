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
    }
`;

export const FULL_PAGE_QUERY = `
query ($urlTitle: String!; $render: Boolean!) {
    DotcmsDocumentationCollection(query: $urlTitle) {
        title
        format
        documentation(render: $render)
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
                    dotcmsdocumentationchildren {
                        urlTitle
                        title
                    }
                }
            }
        }
    }
}
`;

export const FULL_PAGE_FORMAT_QUERY = `
query ($urlTitle: String!) {
    DotcmsDocumentationCollection(query: $urlTitle) {
        title
        format
    }
}`;

// Search
export const DOCUMENTATION_SEARCH_QUERY = `
query ($offset: Int!; $search: String!) {
	DotcmsDocumentationCollection(
        query: $search
        limit: 10
        offset: $offset
    ) {
        title
        urlTitle
        seoDescription	
  } 
}
`;

export const DOCUMENTATION_SEARCH_COUNT = `
query codeshare($search: String!) {
    DotcmsDocumentationCollection(
        query: $search,
        limit: 1000000
    ){
    	urlTitle
  	}
  	QueryMetadata {
      totalCount
    }
}`;

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
query codeshare($tags: String!, $offset: Int!) {
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
