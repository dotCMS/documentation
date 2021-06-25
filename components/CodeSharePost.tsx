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
                <a className="font-bold text-lg	inline-block no-underline text-blue-500 mb-1 hover:underline">
                    {data.title}
                </a>
            </Link>
            <p className="text-sm mb-1">
                <span className="font-bold">Created:</span> {getDate(data.dateCreated)}
            </p>
            {data.authorName ? (
                <p className="text-sm mb-1">
                    <span className="font-bold">Author:</span> {data.authorName}
                </p>
            ) : null}
            <p className="leading-7">{data.seoDescription}</p>
        </div>
    );
};
