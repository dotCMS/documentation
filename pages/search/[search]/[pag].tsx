import React from 'react';
import { GetServerSidePropsResult } from 'next';

// Components
import { FeedBack } from '@components/FeedBack';
import { Footer } from '@components/Footer';
import { Pagination } from '@components/Pagination';
import { SearchResult } from '@components/SearchResult';

// Graphql
import { client } from '@utils/graphql-client';
import {
    DOCUMENTATION_SEARCH_COUNT,
    DOCUMENTATION_SEARCH_QUERY,
    NAVIGATION_MENU_QUERY
} from '@graphql/queries';

// Models
import { Documentation, SearchResultItem } from '@models/Documentation.model';

interface SearchProps {
    data: SearchResultItem[];
    page: number;
    pageTitle: string;
    search: string;
    totalCount: number;
    error?: string;
    navDot?: Documentation[];
}

const Search = ({ data, search, totalCount, page }: SearchProps): JSX.Element => {
    const baseUrlPost = '/search';
    return (
        <div className="overflow-auto flex-col flex flex-grow">
            <main className="container flex-grow">
                <h1>
                    Search: <span className="text-blue-500">{search}</span>
                </h1>
                <h3>{totalCount} Results Found</h3>
                <div>
                    {data.map((result, index) => (
                        <SearchResult key={index} baseUrl={'/latest'} data={result} />
                    ))}
                </div>
                <Pagination
                    baseUrl={baseUrlPost}
                    page={page}
                    search={search}
                    totalCount={totalCount}
                />
            </main>
            <div>
                <FeedBack />
                <Footer />
            </div>
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
        const { DotcmsDocumentationCollection: DotcmsDocumentationNav } = await client.request(
            NAVIGATION_MENU_QUERY
        );
        return {
            props: {
                data: DotcmsDocumentationCollection as SearchResultItem[],
                page: +params.pag,
                pageTitle,
                navDot: DotcmsDocumentationNav,
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
