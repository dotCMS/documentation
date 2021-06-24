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

// mdx custom plugins
import DotCodeMultine from '@plugins/DotCodeMultiline';
import DotDecodeHtml from '@plugins/DotDecodeHtml';

// mdx
import renderToString from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';
import { MDXProvider } from '@mdx-js/react';
import { MdxRemote } from 'next-mdx-remote/types';

interface pageData {
    data: codeshare;
    source: MdxRemote.Source;
}

interface codeshare {
    authorName: string;
    code: string;
    description: string;
    title: string;
}

interface paramsUrlTitle {
    urlTitle: string;
}

export default function CodeShare({ data, source }: pageData): JSX.Element {
    const content = source ? hydrate(source) : null;
    return (
        <div className="overflow-auto flex flex-col">
            <Head>
                <title>Documentation</title>
                <link href="/favicon.ico" rel="icon" />
            </Head>
            <main className="container mx-auto px-16 flex-grow">
                <h2>{data.title}</h2>
                <h3>{data.authorName}</h3>
                <MDXProvider className="wrapper">{content}</MDXProvider>
                <h4>Code</h4>
                <pre>
                    <code>{data.code}</code>
                </pre>
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
}: GetStaticPropsContext<ParsedUrlQuery>): Promise<GetStaticPropsResult<pageData>> {
    try {
        const variables = { urlTitle: `+urlMap:/codeshare/${params.urlTitle}` };
        const { CodeshareCollection } = await client.request(FULL_CODE_SHARE_QUERY, variables);
        const mdxSource = await renderToString(CodeshareCollection[0].description, {
            mdxOptions: {
                remarkPlugins: [DotCodeMultine, DotDecodeHtml]
            }
        });
        return {
            props: {
                data: CodeshareCollection[0],
                source: mdxSource
            }
        };
    } catch (e) {
        throw new Error(e);
    }
}

const buildParams = (data: paramsUrlTitle[], paths: UrlTitleParams[]): UrlTitleParams[] => {
    data.forEach((item: paramsUrlTitle) => {
        paths.push({ params: { urlTitle: item.urlTitle } });
    });
    return paths;
};

interface UrlTitleParams {
    params: {
        urlTitle: string;
    };
}
