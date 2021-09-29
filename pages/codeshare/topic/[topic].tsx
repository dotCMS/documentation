import React from 'react';
import { GetServerSidePropsResult } from 'next';

// Components
import { CodeShareSide } from '@components/codeshare/CodeShareSide';
import { CodeShareSideBox } from '@components/codeshare/CodeShareSideBox';
import { CodeShareTopics } from '@components/codeshare/CodeShareTopics';
import { PageError } from '@components/PageError';
import { Pagination } from '@components/Pagination';
import { SearchResult } from '@components/SearchResult';

// Graphql
import { CODE_SHARE_QUERY_LIST_ARTICLES, CODE_SHARE_QUERY_TOTAL_COUNT } from '@graphql/queries';

// Helpers
import { fetchAllCodeShareTopics } from '@helpers/fetchAllCodeShareTopics';

// Utils
import { client } from '@utils/graphql-client';

// Models
import { SearchResultItem } from '@models/Documentation.model';
import { CodeShareTopic } from '@models/CodeShare.model';

interface PageProps {
    data: SearchResultItem[];
    tag?: string;
    topics?: CodeShareTopic[];
    totalCount?: number;
    error?: string;
    page?: number;
}

export default function Topic({
    data,
    totalCount,
    topics,
    tag,
    page,
    error
}: PageProps): JSX.Element {
    const totalPages = Math.ceil(totalCount / 10);
    const baseUrl = `/codeshare/topic/${tag}?page=`;
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
                            <SearchResult key={item.urlTitle} baseUrl={'/codeshare'} data={item} />
                        ))}
                        <Pagination baseUrl={baseUrl} page={page} totalPages={totalPages} />
                    </main>
                    <CodeShareSide>
                        <CodeShareTopics tag={tag} topics={topics} />
                        <CodeShareSideBox />
                    </CodeShareSide>
                </>
            )}
        </div>
    );
}

export async function getServerSideProps({
    query
}: {
    query: { topic: string; page: number };
}): Promise<GetServerSidePropsResult<PageProps>> {
    try {
        // Consts
        const page = +query.page || 1;
        const tag = query.topic === 'all' ? '' : query.topic.replace(/-/g, ' ');
        const queryTag = tag ? `+tags:\"${tag}\"` : tag;
        const startFrom = page ? (page <= 1 ? 0 : (page - 1) * 10) : 1;
        // Variables
        const variableMetaData = { tags: queryTag };
        const variableList = { ...variableMetaData, offset: startFrom };
        // Requests
        const { CodeshareCollection } = await client.request(
            CODE_SHARE_QUERY_LIST_ARTICLES,
            variableList
        );
        const { QueryMetadata } = await client.request(
            CODE_SHARE_QUERY_TOTAL_COUNT,
            variableMetaData
        );
        const topics = await fetchAllCodeShareTopics();
        return {
            props: {
                data: CodeshareCollection as SearchResultItem[],
                totalCount: QueryMetadata[0].totalCount,
                topics: topics as CodeShareTopic[],
                tag: query.topic,
                page
            }
        };
    } catch (e) {
        return {
            props: {
                data: [],
                error: e.message
            }
        };
    }
}
