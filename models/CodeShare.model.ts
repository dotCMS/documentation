export interface codeshare {
    authorName: string;
    dateCreated: string;
    title: string;
    urlTitle: string;
    seoDescription: string;
}

export interface codesharePost extends codeshare {
    code: string;
    company: string;
    description: string;
}
