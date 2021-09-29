import React, { useEffect, useState } from 'react';
import { GetStaticPathsResult, GetStaticPropsResult } from 'next';

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
}

interface paramsUrlTitle {
    link: string;
}

interface UrlTitleParams {
    params: {
        topic: string;
    };
}

export default function Topic({ data, totalCount, topics, tag, error }: PageProps): JSX.Element {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(totalCount / 10);
    const filteredCodeShare = (): SearchResultItem[] => {
        const start = (currentPage - 1) * 10;
        return data.slice(start, start + 10);
    };
    useEffect(() => {
        setCurrentPage(1);
    }, [tag]);
    return (
        <div className="container flex-col flex flex-grow m-auto md:flex-row">
            {error ? (
                <PageError error={error} title={tag} />
            ) : (
                <>
                    <main className="px-5 w-full">
                        <h1 className="mb-0">Code Share</h1>
                        <h2 className="mb-10 mt-0">Recent Submissions</h2>
                        {filteredCodeShare().map((item) => (
                            <SearchResult key={item.urlTitle} baseUrl={'/codeshare'} data={item} />
                        ))}
                        <Pagination
                            page={currentPage}
                            totalPages={totalPages}
                            updatePage={setCurrentPage}
                        />
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

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
    try {
        const topics = await fetchAllCodeShareTopics();
        const paths = buildParams(topics);
        return {
            paths,
            fallback: false
        };
    } catch (e) {
        throw new Error(e);
    }
}

export async function getStaticProps({
    params
}: {
    params: { topic: string };
}): Promise<GetStaticPropsResult<PageProps>> {
    try {
        // Variables
        const tag = params.topic === 'all' ? '' : params.topic.replace(/-/g, ' ');
        const queryTag = tag ? `+tags:\"${tag}\"` : tag;
        const variablePag = { tags: queryTag };
        const { CodeshareCollection } = await client.request(
            CODE_SHARE_QUERY_LIST_ARTICLES,
            variablePag
        );
        const { QueryMetadata } = await client.request(CODE_SHARE_QUERY_TOTAL_COUNT, variablePag);
        const topics = await fetchAllCodeShareTopics();
        return {
            props: {
                data: CodeshareCollection as SearchResultItem[],
                totalCount: QueryMetadata[0].totalCount,
                topics: topics as CodeShareTopic[],
                tag: params.topic
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

const buildParams = (data: paramsUrlTitle[]): UrlTitleParams[] => {
    return data.map((item: paramsUrlTitle) => ({ params: { topic: item.link } }));
};
