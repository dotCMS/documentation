import React from 'react';
import Link from 'next/link';

// Utils
import { getDate } from '@utils/data-formatter';

// Models
import { codeshareArticle } from '@models/CodeShare.model';

export const CodeSharePost = ({ data }: { data: codeshareArticle }): JSX.Element => {
    return (
        <div className="mb-14 pr-10">
            <Link href={`/codeshare/${data.urlTitle}`}>
                <a className="font-bold inline-block mb-1 no-underline text-blue-500 text-lg hover:underline">
                    {data.title}
                </a>
            </Link>
            <p className="mb-1 text-sm">
                <span className="font-bold">Created:</span> {getDate(data.dateCreated)}
            </p>
            {data.authorName ? (
                <p className="mb-1 text-sm">
                    <span className="font-bold">Author:</span> {data.authorName}
                </p>
            ) : null}
            <p className="leading-7">{data.seoDescription}</p>
        </div>
    );
};
