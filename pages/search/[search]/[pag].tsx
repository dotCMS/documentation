import React from 'react';
import { GetServerSidePropsResult } from 'next';

// Components
import { PostCard } from '@components/PostCard';

// Graphql
import { client } from '@utils/graphql-client';
import { DOCUMENTATION_SEARCH_COUNT, DOCUMENTATION_SEARCH_QUERY } from '@graphql/queries';

// Models
import { CodeShareItem } from '@models/CodeShare.model';
import { Pagination } from '@components/Pagination';

interface SearchProps {
    data: CodeShareItem[];
    page: number;
    pageTitle: string;
    search: string;
    totalCount: number;
    error?: string;
}

const Search = ({ data, search, totalCount, page }: SearchProps): JSX.Element => {
    const baseUrlPost = '/search';
    return (
        <div className="container flex-col flex flex-grow m-auto md:flex-row">
            <main className="px-5 w-full">
                <h1>Search: {search}</h1>
                <h3>{totalCount} Results Found</h3>
                <div>
                    {data.map((result, index) => (
                        <PostCard key={index} baseUrl={'/latest'} data={result} />
                    ))}
                </div>
                <Pagination
                    baseUrl={baseUrlPost}
                    page={page}
                    postPerPage={10}
                    search={search}
                    totalCount={totalCount}
                />
            </main>
        </div>
    );
};

export async function getServerSideProps({
    params
}: {
    params: { search: string; pag: number };
}): Promise<GetServerSidePropsResult<SearchProps>> {
    const pageTitle = 'Search';
    const query = `+title:${params.search}*`;
    const startFrom = +params.pag <= 1 ? 0 : (+params.pag - 1) * 10;
    try {
        // Variables
        const { DotcmsDocumentationCollection } = await client.request(DOCUMENTATION_SEARCH_QUERY, {
            search: query,
            offset: startFrom
        });
        const { QueryMetadata } = await client.request(DOCUMENTATION_SEARCH_COUNT, {
            search: query
        });
        return {
            props: {
                data: DotcmsDocumentationCollection as CodeShareItem[],
                page: +params.pag,
                pageTitle,
                search: params.search,
                totalCount: QueryMetadata[0].totalCount
            }
        };
    } catch (e) {
        return {
            props: {
                data: null,
                page: null,
                pageTitle,
                search: null,
                totalCount: null,
                error: e.message
            }
        };
    }
}

export default Search;
