import React from 'react';
import { GetServerSidePropsResult } from 'next';
import Link from 'next/link';
import classNames from 'classnames';

// Components
import { CodeSharePost } from '@components/CodeSharePost';
import { CodeShareSide } from '@components/CodeShareSide';
import { CodeShareTopics } from '@components/CodeShareTopics';

// Graphql
import { CODE_SHARE_QUERY_LIST_ARTICLES, CODE_SHARE_QUERY_TOTAL_COUNT } from '@graphql/queries';

// Utils
import { client } from '@utils/graphql-client';

// Models
import { CodeSharePostInterface, CodeShareTopicsInterface } from '@models/CodeShare.model';

interface PageProps {
    data: CodeSharePostInterface[];
    page: number;
    totalCount: number;
    tag: string;
    topics: CodeShareTopicsInterface[];
}

const postPerPage = 10;

export default function CodeShareTag({
    data,
    page,
    totalCount,
    tag,
    topics
}: PageProps): JSX.Element {
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
            <CodeShareSide>
                <CodeShareTopics topics={topics} />
            </CodeShareSide>
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

export async function getServerSideProps({
    params
}: {
    params: { tag: string; pag: string };
}): Promise<GetServerSidePropsResult<PageProps>> {
    const pageNumber = +params.pag;
    const tags = params.tag == 'all' ? '' : `+tags:${params.tag}`;
    const startFrom = pageNumber <= 1 ? 0 : (pageNumber - 1) * postPerPage;
    // Variables
    const variablePag = { offset: startFrom, tags };
    const { CodeshareCollection } = await client.request(
        CODE_SHARE_QUERY_LIST_ARTICLES,
        variablePag
    );
    const { QueryMetadata } = await client.request(CODE_SHARE_QUERY_TOTAL_COUNT, { tags });
    const topics = await getTopics();
    return {
        props: {
            data: CodeshareCollection as CodeSharePostInterface[],
            page: pageNumber,
            totalCount: QueryMetadata[0].totalCount,
            tag: params.tag,
            topics: topics
        }
    };
}

const getTopics = async (): Promise<CodeShareTopicsInterface[]> => {
    const { esresponse } = await (
        await fetch('https://authoring.dotcms.com/api/es/search', TOPIC_QUERY)
    ).json();
    const resp = esresponse[0].aggregations['sterms#tag'].buckets;
    const data = resp.map((topic) => {
        const link = topic.key.replace(/ /g, '-');
        return {
            title: topic.key,
            link
        };
    });
    data.unshift({ title: 'All Codeshare', link: 'all' });
    return data;
};

const TOPIC_QUERY = {
    method: 'POST',
    headers: {
        cookie: 'BACKENDID=192.168.48.3',
        'Content-Type': 'application/json'
    },
    body: `{\"query\":{\"query_string\":{\"query\":\"+contenttype:codeshare\"}},\"aggs\":{\"tag\":{\"terms\":{\"field\":\"tags\",\"size\":20}}},\"size\":0}`
};
