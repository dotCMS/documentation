import React from 'react';
import Link from 'next/link';

// Components
import { DateFormatter } from '@components/DateFormatter';
// Models
import { SearchResultItem } from '@models/Documentation.model';

export const SearchResult = ({
    baseUrl,
    data: { urlTitle, title, dateCreated, authorName, seoDescription }
}: {
    baseUrl: string;
    data: SearchResultItem;
}): JSX.Element => {
    return (
        <div className="mb-14 pr-10 border-b border-gray">
            <Link href={`${baseUrl}/${urlTitle}`}>
                <a className="font-bold inline-block mb-1 no-underline text-blue-500 text-lg hover:underline">
                    {title}
                </a>
            </Link>
            {dateCreated && (
                <p className="mb-1">
                    <b>Created:</b> <DateFormatter time={dateCreated} />
                </p>
            )}
            {authorName && (
                <p className="mb-1">
                    <b>Author:</b> {authorName}
                </p>
            )}
            {seoDescription && <p className="text-lg">{seoDescription}</p>}
        </div>
    );
};
