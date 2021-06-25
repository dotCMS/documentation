import React from 'react';
import Link from 'next/link';

// Utils
import { getDate } from '@utils/data-formatter';

interface codeshare {
    authorName: string;
    code: string;
    company: string;
    dateCreated: string;
    description: string;
    title: string;
    urlTitle: string;
    seoDescription: string;
}

export const CodeSharePost = ({ data }: { data: codeshare }): JSX.Element => {
    return (
        <div>
            <Link href={`/codeshare/${data.urlTitle}`}>
                <a className="no-underline text-gray-150 hover:underline">{data.title}</a>
            </Link>
            <div>
                <p className="text-sm">
                    <span className="font-bold">Created:</span> {getDate(data.dateCreated)}
                </p>
                <p>Drescription</p>
            </div>
        </div>
    );
};
