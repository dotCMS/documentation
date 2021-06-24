import React from 'react';
import { GetStaticPropsResult } from 'next';
import classNames from 'classnames';
import Head from 'next/head';

// Components
import { FeedBack } from '@components/FeedBack';
import { Footer } from '@components/Footer';

// Graphql
import { CODE_SHARE_PATHS_QUERY } from '@graphql/queries';

// Utils
import { client } from '@utils/graphql-client';

interface codeshare {
    authorName: string;
    code: string;
    company: string;
    dateCreated: string;
    description: string;
    tag: string[];
    title: string;
    urlTitle: string;
}

export default function Home({ data }: { data: codeshare[] }): JSX.Element {
    return (
        <div className="overflow-auto flex flex-col">
            <Head>
                <title>Documentation</title>
                <link href="/favicon.ico" rel="icon" />
            </Head>
            <main className="container mx-auto px-16 flex-grow">
                <h1>Code Share</h1>
            </main>
            <div>
                <FeedBack />
                <Footer />
            </div>
        </div>
    );
}

export async function getStaticProps(): Promise<GetStaticPropsResult<{ data: codeshare[] }>> {
    try {
        const { CodeshareCollection } = await client.request(CODE_SHARE_PATHS_QUERY);
        return {
            props: {
                data: CodeshareCollection as codeshare[]
            }
        };
    } catch (e) {
        throw new Error(e);
    }
}
