import React from 'react';
import Link from 'next/link';

// Components
import { DateFormatter } from '@components/DateFormatter';
// Models
import { CodeShareItem } from '@models/CodeShare.model';

export const CodeSharePost = ({ data }: { data: CodeShareItem }): JSX.Element => {
    return (
        <div className="mb-14 pr-10">
            <Link href={`/codeshare/${data.urlTitle}`}>
                <a className="font-bold inline-block mb-1 no-underline text-blue-500 text-lg hover:underline">
                    {data.title}
                </a>
            </Link>
            <p className="mb-1">
                <b>Created:</b> <DateFormatter time={data.dateCreated} />
            </p>
            {data.authorName ? (
                <p className="mb-1">
                    <b>Author:</b> {data.authorName}
                </p>
            ) : null}
            <p className="text-lg">{data.seoDescription}</p>
        </div>
    );
};
