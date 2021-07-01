import React from 'react';
import Link from 'next/link';

// helpers
import { getDate } from '@helpers/data-formatter';

// Models
import { CodeSharePostInterface } from '@models/CodeShare.model';

export const CodeSharePost = ({ data }: { data: CodeSharePostInterface }): JSX.Element => {
    return (
        <div className="mb-14 pr-10">
            <Link href={`/codeshare/${data.urlTitle}`}>
                <a className="font-bold inline-block mb-1 no-underline text-blue-500 text-lg hover:underline">
                    <h3 className="m-0">{data.title}</h3>
                </a>
            </Link>
            <p className="mb-1">
                <span className="font-bold">Created:</span> {getDate(data.dateCreated)}
            </p>
            {data.authorName ? (
                <p className="mb-1">
                    <span className="font-bold">Author:</span> {data.authorName}
                </p>
            ) : null}
            <p className="text-lg leading-7">{data.seoDescription}</p>
        </div>
    );
};
