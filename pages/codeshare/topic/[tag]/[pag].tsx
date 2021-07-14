import React from 'react';
import { GetServerSidePropsResult } from 'next';

// Components
import { CodeShareSide } from '@components/CodeShareSide';
import { CodeShareSideBox } from '@components/CodeShareSideBox';
import { CodeShareTopics } from '@components/CodeShareTopics';
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
import { CodeShareTopic } from '@models/CodeShare.model';
import { SearchResultItem } from '@models/Documentation.model';

interface PageProps {
    data: SearchResultItem[];
    page: number;
    tag: string;
    topics: CodeShareTopic[];
    totalCount?: number;
    pageTitle?: string;
    error?: string;
}

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
                            <SearchResult key={item.urlTitle} baseUrl={'/codeshare'} data={item} />
                        ))}
                        <Pagination
                            baseUrl={'/codeshare/topic'}
                            page={page}
                            search={tag}
                            totalCount={totalCount}
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

export async function getServerSideProps({
    params
}: {
    params: { tag: string; pag: string };
}): Promise<GetServerSidePropsResult<PageProps>> {
    const pageTitle = 'Codeshare';
    const queryTag = params.tag.replace(/-/g, ' ');
    const tags = params.tag == 'all' ? '' : `+tags:\"${queryTag}\"`;
    const startFrom = +params.pag <= 1 ? 0 : (+params.pag - 1) * 10;
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
                data: CodeshareCollection as SearchResultItem[],
                page: +params.pag,
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
                page: +params.pag,
                tag: params.tag,
                topics: null,
                error: e.message
            }
        };
    }
}
