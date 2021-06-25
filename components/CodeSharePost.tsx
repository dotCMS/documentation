import React from 'react';
import Link from 'next/link';

interface codeshare {
    authorName: string;
    code: string;
    company: string;
    dateCreated: string;
    description: string;
    title: string;
    urlTitle: string;
}

export const CodeSharePost = ({ data }: { data: codeshare }): JSX.Element => {
    return (
        <div>
            <Link href={`/codeshare/${data.urlTitle}`}>
                <a>{data.title}</a>
            </Link>
            <div>
                <p>
                    <span>Created:</span> {data.dateCreated}
                </p>
            </div>
            <p>Drescription</p>
        </div>
    );
};
