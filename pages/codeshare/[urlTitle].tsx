import React from 'react';
import { GetStaticPropsResult, GetStaticPathsResult, GetStaticPropsContext } from 'next';
import Head from 'next/head';

// Components
import { FeedBack } from '@components/FeedBack';
import { Footer } from '@components/Footer';

// Graphql
import { CODE_SHARE_PATHS_QUERY, FULL_CODE_SHARE_QUERY } from '@graphql/queries';

// Utils
import { client } from '@utils/graphql-client';
import { ParsedUrlQuery } from 'node:querystring';

interface pageData {
    authorName: string;
    code: string;
    description: string;
    title: string;
}

export default function CodeShare({ data }: { data: pageData }): JSX.Element {
    return (
        <div className="overflow-auto flex flex-col">
            <Head>
                <title>Documentation</title>
                <link href="/favicon.ico" rel="icon" />
            </Head>
            <main className="container mx-auto px-16 flex-grow">
                <h2>{data.title}</h2>
                <h3>{data.authorName}</h3>
            </main>
            <div>
                <FeedBack />
                <Footer />
            </div>
        </div>
    );
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
    const data = await client.request(CODE_SHARE_PATHS_QUERY);
    try {
        const paths = buildParams(data.CodeshareCollection, []);
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
}: GetStaticPropsContext<ParsedUrlQuery>): Promise<GetStaticPropsResult<{ data: pageData }>> {
    try {
        const variables = { urlTitle: `+urlMap:/codeshare/${params.urlTitle}` };
        const { CodeshareCollection } = await client.request(FULL_CODE_SHARE_QUERY, variables);
        return {
            props: {
                data: CodeshareCollection[0]
            }
        };
    } catch (e) {
        throw new Error(e);
    }
}

const buildParams = (data: any[], paths: UrlTitleParams[]): UrlTitleParams[] => {
    data.forEach((item: any) => {
        paths.push({ params: { urlTitle: item.urlTitle } });
    });
    return paths;
};

interface UrlTitleParams {
    params: {
        urlTitle: string;
    };
}
