export interface codesharePost {
    authorName: string;
    dateCreated: string;
    title: string;
    urlTitle: string;
    seoDescription: string;
}

export interface codesharePage extends codesharePost {
    code: string;
    company: string;
    description: string;
}
