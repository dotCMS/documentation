import React, { useEffect } from 'react';
import { GetStaticPropsResult } from 'next';
import { useRouter } from 'next/router';

// Components
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
import { useState } from 'react';

interface SearchProps {
    pageTitle?: string;
    error?: string;
    navDot?: Documentation[];
}

interface fetchResultItem {
    data: SearchResultItem[];
    totalCount: number;
}

const Search = (): JSX.Element => {
    const router = useRouter();
    const [results, setResult] = useState<SearchResultItem[]>([]);
    const [totalCount, setTotalCount] = useState<number>();
    const search = router.query.search as string;
    const page = +router.query.pag;
    const baseUrlSearch = `/search?search=${search}&pag=`;
    useEffect(() => {
        if (router.isReady) {
            fetchSearchResults(search, page)
                .then((resp) => resp)
                .then((resp) => {
                    setResult(resp.data);
                    setTotalCount(resp.totalCount);
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router, router.isReady]);
    return (
        <div className="overflow-auto flex-col flex flex-grow">
            {results.length > 0 ? (
                <main className="container flex-grow">
                    <h1>
                        Search: <span className="text-blue-500">{search}</span>
                    </h1>
                    <h3>{totalCount} Results Found</h3>
                    <div>
                        {results.map((result, index) => (
                            <SearchResult key={index} baseUrl={'/latest'} data={result} />
                        ))}
                    </div>
                    {totalCount && (
                        <Pagination baseUrl={baseUrlSearch} page={page} totalCount={totalCount} />
                    )}
                </main>
            ) : (
                <main className="container flex-grow">
                    <h1>Loading</h1>
                </main>
            )}
            <Footer />
        </div>
    );
};

const fetchSearchResults = async (search: string, pag: number): Promise<fetchResultItem> => {
    const query = `+title:${search}*`;
    const startFrom = +pag <= 1 ? 0 : (+pag - 1) * 10;
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
            data: DotcmsDocumentationCollection as SearchResultItem[],
            totalCount: QueryMetadata[0].totalCount
        };
    } catch (e) {
        return;
    }
};

export async function getStaticProps(): Promise<GetStaticPropsResult<SearchProps>> {
    try {
        const { DotcmsDocumentationCollection } = await client.request(NAVIGATION_MENU_QUERY);
        return {
            props: {
                pageTitle: 'Search',
                navDot: DotcmsDocumentationCollection
            }
        };
    } catch (e) {
        return {
            props: {
                pageTitle: 'Search',
                error: e.message
            }
        };
    }
}

export default Search;
