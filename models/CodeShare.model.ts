export interface CodeSharePostInterface {
    authorName: string;
    dateCreated: string;
    title: string;
    urlTitle: string;
    seoDescription: string;
}

export interface CodeSharePage extends CodeSharePostInterface {
    code: string;
    company: string;
    description: string;
}

export interface CodeShareTopicsInterface {
    title: string;
    link: string;
}
