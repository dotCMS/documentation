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
        <div className="mb-14 pr-10">
            <Link href={`/codeshare/${data.urlTitle}`}>
                <a className="font-bold text-lg	inline-block no-underline text-blue-500 mb-1 hover:underline">
                    {data.title}
                </a>
            </Link>
            <p className="text-sm mb-1">
                <span className="font-bold">Created:</span> {getDate(data.dateCreated)}
            </p>
            <p className="leading-7">{data.seoDescription}</p>
        </div>
    );
};
