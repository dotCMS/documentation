import React from 'react';
import { GetStaticPropsResult } from 'next';
import Head from 'next/head';

// Components
import { FeedBack } from '@components/FeedBack';
import { Footer } from '@components/Footer';
import { CodeSharePost } from '@components/CodeSharePost';

// Graphql
import { CODE_SHARE_PATHS_QUERY } from '@graphql/queries';

// Utils
import { client } from '@utils/graphql-client';

// Models
import { codeshareArticle } from '@models/CodeShare.model';

export default function Home({ data }: { data: codeshareArticle[] }): JSX.Element {
    return (
        <div className="overflow-auto flex flex-col">
            <Head>
                <title>Documentation</title>
                <link href="/favicon.ico" rel="icon" />
            </Head>
            <main className="container mx-auto px-16 flex-grow">
                <h1 className="mb-0">Code Share</h1>
                <h2 className="mt-0 mb-10">Recent Submissions</h2>
                {data.map((item) => (
                    <CodeSharePost key={item.urlTitle} data={item} />
                ))}
            </main>
            <div>
                <FeedBack />
                <Footer />
            </div>
        </div>
    );
}

export async function getStaticProps(): Promise<
    GetStaticPropsResult<{ data: codeshareArticle[] }>
> {
    try {
        const { CodeshareCollection } = await client.request(CODE_SHARE_PATHS_QUERY);
        return {
            props: {
                data: CodeshareCollection as codeshareArticle[]
            }
        };
    } catch (e) {
        throw new Error(e);
    }
}
