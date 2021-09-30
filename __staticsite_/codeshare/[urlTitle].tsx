import React from 'react';
import { GetStaticPropsResult, GetStaticPathsResult, GetStaticPropsContext } from 'next';
import classNames from 'classnames';

// Components
import { PageError } from '@components/PageError';
import { DateFormatter } from '@components/DateFormatter';

// Graphql
import { CODE_SHARE_PATHS_QUERY, FULL_CODE_SHARE_QUERY } from '@graphql/queries';

// Models
import { CodeSharePage } from '@models/CodeShare.model';

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
    data: CodeSharePage;
    source: MdxRemote.Source;
    error?: string;
    pageTitle?: string;
}

interface paramsUrlTitle {
    urlTitle: string;
}

export default function CodeShare({
    data: { authorName, code, company, dateCreated, title },
    source,
    error
}: pageData): JSX.Element {
    const content = source ? hydrate(source) : null;
    const mainClasses = ['container', 'mx-auto', 'px-16', 'flex-grow'];
    return (
        <>
            {error ? (
                <PageError error={error} title={title} />
            ) : (
                <main className={classNames(mainClasses)}>
                    <h1>{title}</h1>
                    <ul>
                        <li>
                            Created: <DateFormatter time={dateCreated} />
                        </li>
                        {authorName && <li>Author: {authorName}</li>}
                        {company && <li>Company: {company}</li>}
                    </ul>
                    <h3>Description</h3>
                    <MDXProvider className="wrapper">{content}</MDXProvider>
                    <h3>Code</h3>
                    <pre>
                        <code>{code}</code>
                    </pre>
                </main>
            )}
        </>
    );
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
    const data = await client.request(CODE_SHARE_PATHS_QUERY);
    try {
        const paths = buildParams(data.CodeshareCollection);
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
                pageTitle: CodeshareCollection[0].title,
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

const buildParams = (data: paramsUrlTitle[]): UrlTitleParams[] => {
    return data.map(({ urlTitle }: paramsUrlTitle) => ({ params: { urlTitle } }));
};

interface UrlTitleParams {
    params: {
        urlTitle: string;
    };
}
