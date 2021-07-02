export interface CodeShareItem {
    authorName: string;
    dateCreated: string;
    title: string;
    urlTitle: string;
    seoDescription: string;
}

export interface CodeSharePage extends CodeShareItem {
    code: string;
    company: string;
    description: string;
}

export interface CodeShareTopic {
    title: string;
    link: string;
}
