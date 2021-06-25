export interface codeshareArticle {
    authorName: string;
    dateCreated: string;
    title: string;
    urlTitle: string;
    seoDescription: string;
}

export interface codeshare extends codeshareArticle {
    code: string;
    company: string;
    description: string;
}
