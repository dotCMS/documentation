import React from 'react';
import { GetServerSidePropsResult } from 'next';
import Link from 'next/link';
import classNames from 'classnames';

// Components
import { CodeSharePost } from '@components/CodeSharePost';
import { CodeShareSide } from '@components/CodeShareSide';
import { CodeShareSideBox } from '@components/CodeShareSideBox';
import { CodeShareTopics } from '@components/CodeShareTopics';
import { PageError } from '@components/PageError';

// Graphql
import { CODE_SHARE_QUERY_LIST_ARTICLES, CODE_SHARE_QUERY_TOTAL_COUNT } from '@graphql/queries';

// Helpers
import { fetchAllCodeShareTopics } from '@helpers/fetchAllCodeShareTopics';

// Utils
import { client } from '@utils/graphql-client';

// Models
import { CodeShareItem, CodeShareTopic } from '@models/CodeShare.model';

interface PageProps {
    data: CodeShareItem[];
    page: number;
    totalCount?: number;
    tag: string;
    topics: CodeShareTopic[];
    pageTitle?: string;
    error?: string;
}

const postPerPage = 10;

export default function CodeShareTag({
    data,
    page,
    totalCount,
    tag,
    topics,
    error
}: PageProps): JSX.Element {
    return (
        <div className="container flex-col flex flex-grow m-auto md:flex-row">
            {error ? (
                <PageError error={error} title={tag} />
            ) : (
                <>
                    <main className="px-5 w-full">
                        <h1 className="mb-0">Code Share</h1>
                        <h2 className="mb-10 mt-0">Recent Submissions</h2>
                        {data.map((item) => (
                            <CodeSharePost key={item.urlTitle} data={item} />
                        ))}
                        <NextPrevButtons page={page} tag={tag} totalCount={totalCount} />
                    </main>
                    <CodeShareSide>
                        <CodeShareTopics topics={topics} />
                        <CodeShareSideBox />
                    </CodeShareSide>
                </>
            )}
        </div>
    );
}

export async function getServerSideProps({
    params
}: {
    params: { tag: string; pag: string };
}): Promise<GetServerSidePropsResult<PageProps>> {
    const pageTitle = 'Codeshare';
    const pageNumber = +params.pag;
    const queryTag = params.tag.replace(/-/g, ' ');
    const tags = params.tag == 'all' ? '' : `+tags:\"${queryTag}\"`;
    const startFrom = pageNumber <= 1 ? 0 : (pageNumber - 1) * postPerPage;
    try {
        // Variables
        const topics = await fetchAllCodeShareTopics();
        const variablePag = { offset: startFrom, tags };
        const { CodeshareCollection } = await client.request(
            CODE_SHARE_QUERY_LIST_ARTICLES,
            variablePag
        );
        const { QueryMetadata } = await client.request(CODE_SHARE_QUERY_TOTAL_COUNT, { tags });
        return {
            props: {
                data: CodeshareCollection as CodeShareItem[],
                page: pageNumber,
                totalCount: QueryMetadata[0].totalCount,
                tag: params.tag,
                topics: topics,
                pageTitle
            }
        };
    } catch (e) {
        return {
            props: {
                data: null,
                page: pageNumber,
                tag: params.tag,
                topics: null,
                error: e.message
            }
        };
    }
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
        'no-underline',
        'px-2',
        'py-2',
        'rounded',
        'focus:outline-none'
    ];
    const totalCountPage = page * postPerPage;
    return (
        <>
            {page > 1 ? (
                <Link href={`/codeshare/topic/${urlTag}${page - 1}`}>
                    <a className={classNames(buttonClasses)}>Previous</a>
                </Link>
            ) : null}
            {totalCountPage < totalCount ? (
                <Link href={`/codeshare/topic/${urlTag}${page + 1}`}>
                    <a className={classNames(buttonClasses)}>Next</a>
                </Link>
            ) : null}
        </>
    );
};
