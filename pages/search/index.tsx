import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// Components
import { CodeSharePost } from '@components/CodeSharePost';

// Graphql
import { client } from '@utils/graphql-client';
import { DOCUMENTATION_SEARCH_QUERY } from '@graphql/queries';

// Models
import { CodeShareItem } from '@models/CodeShare.model';

interface searchResult {
    authorName: string;
    title: string;
    urlTitle: string;
    dateCreated?: string;
    seoDescription?: string;
}

const Search = (): JSX.Element => {
    const router = useRouter();
    const param = `+title:${router.query.q}*`;
    const [isLoding, setIsLoading] = useState(true);
    const [results, setResults] = useState<CodeShareItem[]>([]);
    useEffect(() => {
        if (router.isReady) {
            client
                .request(DOCUMENTATION_SEARCH_QUERY, { search: param })
                .then(({ DotcmsDocumentationCollection }: any) => {
                    setResults(DotcmsDocumentationCollection);
                    setIsLoading(false);
                });
        }
        //
    }, [router.query.q]);
    return (
        <div className="container flex-col flex flex-grow m-auto md:flex-row">
            <>
                <main className="px-5 w-full">
                    <h1>Search</h1>
                    {isLoding ? (
                        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative">
                            <strong className="font-bold text-lg">Loading...</strong>
                        </div>
                    ) : (
                        <div>
                            {results.map((result, index) => (
                                <CodeSharePost key={index} data={result} />
                            ))}
                        </div>
                    )}
                </main>
            </>
        </div>
    );
};

export default Search;
