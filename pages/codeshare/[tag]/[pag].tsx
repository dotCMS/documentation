import React from 'react';
import { GetServerSidePropsResult } from 'next';
import Link from 'next/link';
import classNames from 'classnames';

// Components
import { CodeSharePost } from '@components/CodeSharePost';
import { CodeShareSide } from '@components/CodeShareSide';

// Graphql
import { CODE_SHARE_QUERY_LIST_ARTICULES, CODE_SHARE_QUERY_TOTAL_COUNT } from '@graphql/queries';

// Utils
import { client } from '@utils/graphql-client';

// Models
import { codesharePost } from '@models/CodeShare.model';

interface pageProps {
    data: codesharePost[];
    page: number;
    totalCount: number;
    tag: string;
}

const postPerPage = 10;

export default function Home({ data, page, totalCount, tag }: pageProps): JSX.Element {
    return (
        <div className="container flex flex-grow mx-auto">
            <main className="px-5 w-full">
                <h1 className="mb-0">Code Share</h1>
                <h2 className="mb-10 mt-0">Recent Submissions</h2>
                {data.map((item) => (
                    <CodeSharePost key={item.urlTitle} data={item} />
                ))}
                <NextPrevButtons page={page} tag={tag} totalCount={totalCount} />
            </main>
            <CodeShareSide />
        </div>
    );
}

const NextPrevButtons = ({
    page,
    tag,
    totalCount
}: {
    page: number;
    tag: string;
    totalCount: number;
}): JSX.Element => {
    const urlTag = tag ? `${tag}/` : '';
    const buttonClasses = [
        'bg-white',
        'border-gray',
        'border',
        'mr-2',
        'px-2',
        'py',
        'rounded',
        'focus:outline-none'
    ];
    const totalCountPage = page * postPerPage;
    return (
        <>
            {page > 1 ? (
                <Link href={`/codeshare/${urlTag}${page - 1}`}>
                    <button className={classNames(buttonClasses)}>Previous</button>
                </Link>
            ) : null}
            {totalCountPage < totalCount ? (
                <Link href={`/codeshare/${urlTag}${page + 1}`}>
                    <button className={classNames(buttonClasses)}>Next</button>
                </Link>
            ) : null}
        </>
    );
};

export async function getServerSideProps({
    params
}: {
    params: { tag: string; pag: string };
}): Promise<GetServerSidePropsResult<pageProps>> {
    const pageNumber = +params.pag;
    const tags = params.tag == 'all' ? '' : `+tags:${params.tag}`;
    const startFrom = pageNumber <= 1 ? 0 : (pageNumber - 1) * postPerPage;
    // Variables
    const variablePag = { offset: startFrom, tags };
    const { CodeshareCollection } = await client.request(
        CODE_SHARE_QUERY_LIST_ARTICULES,
        variablePag
    );
    const { QueryMetadata } = await client.request(CODE_SHARE_QUERY_TOTAL_COUNT, { tags });
    return {
        props: {
            data: CodeshareCollection as codesharePost[],
            page: pageNumber,
            totalCount: QueryMetadata[0].totalCount,
            tag: params.tag
        }
    };
}
