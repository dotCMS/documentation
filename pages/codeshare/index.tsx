import React from 'react';
import { useRouter } from 'next/dist/client/router';
import { GetServerSidePropsResult } from 'next';
import classNames from 'classnames';

// Components
import { CodeSharePost } from '@components/CodeSharePost';
import { CodeShareSide } from '@components/CodeShareSide';

// Graphql
import {
    CODE_SHARE_QUERY_LIST_ARTICULES,
    CODE_SHARE_QUERY_LIST_TAGS,
    CODE_SHARE_QUERY_TOTAL_COUNT
} from '@graphql/queries';

// Utils
import { client } from '@utils/graphql-client';

// Models
import { codesharePost } from '@models/CodeShare.model';

interface pageProps {
    data: codesharePost[];
    tag: string;
    page: number;
    totalCount: number;
}

export default function Home({ data, page, totalCount }: pageProps): JSX.Element {
    return (
        <div className="container flex flex-grow mx-auto">
            <main className="px-5 w-full">
                <h1 className="mb-0">Code Share</h1>
                <h2 className="mb-10 mt-0">Recent Submissions</h2>
                {data.map((item) => (
                    <CodeSharePost key={item.urlTitle} data={item} />
                ))}
                <NextPrevButtons page={page} totalCount={totalCount} />
            </main>
            <CodeShareSide />
        </div>
    );
}

const NextPrevButtons = ({
    page,
    totalCount
}: {
    page: number;
    totalCount: number;
}): JSX.Element => {
    const router = useRouter();
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
    const totalCountPage = page * 10;
    return (
        <>
            {page > 1 ? (
                <button
                    className={classNames(buttonClasses)}
                    onClick={() => router.push(`/codeshare?page=${page - 1}`)}
                >
                    Previous
                </button>
            ) : null}
            {totalCountPage < totalCount ? (
                <button
                    className={classNames(buttonClasses)}
                    onClick={() => router.push(`/codeshare?page=${page + 1}`)}
                >
                    Next
                </button>
            ) : null}
        </>
    );
};

export async function getServerSideProps({
    query: { page = 1, tag = '' }
}: {
    query: { page: number; tag: string };
}): Promise<GetServerSidePropsResult<pageProps>> {
    const startFrom = page <= 1 ? 0 : (page - 1) * 10;
    // Variables
    const variableTag = { tags: `+tags:${tag}` };
    const variablePag = { offset: startFrom };
    const { CodeshareCollection } = tag
        ? await client.request(CODE_SHARE_QUERY_LIST_TAGS, variableTag)
        : await client.request(CODE_SHARE_QUERY_LIST_ARTICULES, variablePag);
    const { QueryMetadata } = await client.request(CODE_SHARE_QUERY_TOTAL_COUNT);
    return {
        props: {
            data: CodeshareCollection as codesharePost[],
            page: +page,
            tag: tag,
            totalCount: QueryMetadata[0].totalCount
        }
    };
}
