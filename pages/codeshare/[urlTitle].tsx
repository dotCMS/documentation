import React from 'react';
import { GetStaticPropsResult, GetStaticPathsResult, GetStaticPropsContext } from 'next';
import Head from 'next/head';

// Components
import { FeedBack } from '@components/FeedBack';
import { Footer } from '@components/Footer';
import { Terminal } from '@components/PageRenderError';

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
    error?: string;
}

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

interface paramsUrlTitle {
    urlTitle: string;
}

export default function CodeShare({ data, source, error }: pageData): JSX.Element {
    const content = source ? hydrate(source) : null;
    const getDate = (date: string) => {
        const created = new Date(date);
        return `${created.toLocaleDateString('en-US', { month: 'short' })} ${created.getDay()}, 
        ${created.getFullYear()}`;
    };
    const printTags = (tags: string[]) => {
        const lastIndet = tags.length - 1;
        return tags.map((tag, index) => {
            return lastIndet === index ? tag : tag + ', ';
        });
    };
    return (
        <div className="overflow-auto flex flex-col">
            <Head>
                <title>Documentation</title>
                <link href="/favicon.ico" rel="icon" />
            </Head>
            {error ? (
                <main className="container mx-auto px-16 flex-grow">
                    <h1>{data.title}</h1>
                    <Terminal content={error} />
                </main>
            ) : (
                <main className="container mx-auto px-16 flex-grow">
                    <h1>{data.title}</h1>
                    <ul>
                        <li>Created: {getDate(data.dateCreated)}</li>
                        <li>Author: {data.authorName}</li>
                        <li>Company: {data.company}</li>
                        <li>Tags: {printTags(data.tag)}</li>
                    </ul>
                    <h3>Description</h3>
                    <MDXProvider className="wrapper">{content}</MDXProvider>
                    <h3>Code</h3>
                    <pre>
                        <code>{data.code}</code>
                    </pre>
                </main>
            )}
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
    const variables = { urlTitle: `+urlMap:/codeshare/${params.urlTitle}` };
    const { CodeshareCollection } = await client.request(FULL_CODE_SHARE_QUERY, variables);
    try {
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
        return {
            props: {
                data: CodeshareCollection[0],
                source: null,
                error: e.message
            }
        };
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
