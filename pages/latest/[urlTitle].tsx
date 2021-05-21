import React, { useEffect, useRef, useState } from 'react';
import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';
import remarkId from 'remark-heading-id';
import html from 'remark-html';
import prism from 'remark-prism';
import DotHtmlToJsxRemark from '@plugins/DotHtmlToJsxRemark';
import DotDecodeHtml from '@plugins/DotDecodeHtml';
import DotToc, { toc } from '@plugins/DotToc';

// Components
import { Terminal } from '@components/PageRenderError';
import ImageMarkdown from '@components/ImageMarkdown';
import LinkMarkdown from '@components/LinkMarkdown';
import TableOfContent from '@components/TableOfContent';

// Graphql
import { NAVIGATION_MENU_QUERY, FULL_PAGE_QUERY } from '@graphql/queries';

// Models
import { Documentation } from '@models/Documentation.model';
import { TableContentModel } from '@models/TableOfConent.model';

// Utils
import { client } from '@utils/graphql-client';

// mdx
import renderToString from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';
import { MDXProvider } from '@mdx-js/react';
import { MdxRemote } from 'next-mdx-remote/types';
import { MDXProviderComponentsProp } from '@mdx-js/react';

interface PageData {
    data: Documentation;
    navDot: Documentation[];
    source: MdxRemote.Source;
    toc?: TableContentModel[];
    error?: string;
}

const componentsUI: MDXProviderComponentsProp = {
    img: ImageMarkdown,
    a: LinkMarkdown
};

const UrlTitle = ({ data, source, toc, error }: PageData): JSX.Element => {
    const content = source ? hydrate(source, { components: componentsUI }) : null;
    // ---- Table Of Content Active Item
    const [tocActive, setTocActive] = useState(null);
    const observer = useRef(null);
    const options = {
        root: null,
        rootMargin: '0px 0px -70% 0px',
        threshold: 1
    };
    useEffect(() => {
        const targets = document.querySelectorAll('h2,h3');
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setTocActive(entry.target.id);
            }
        }, options);
        const { current: currentObserver } = observer;
        targets.forEach((target) => currentObserver.observe(target));
        return () => currentObserver.disconnect();
    });
    return (
        <>
            <Head>
                <title>{data.title}</title>
            </Head>
            {error ? (
                <div>
                    <h1>{data.title}</h1>
                    <Terminal content={error} />
                </div>
            ) : (
                <>
                    <main className="container mt-4 md:mt-0 justify-self-center overflow-y-scroll">
                        <h1>{data.title}</h1>
                        <MDXProvider className="wrapper" components={componentsUI}>
                            {content}
                        </MDXProvider>
                    </main>
                    {!!toc?.length && (
                        <div className="hidden lg:block w-60 px-3 overflow-auto">
                            <h4>Table of Content</h4>
                            <TableOfContent active={tocActive} titles={toc} />
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
    try {
        const data = await client.request(NAVIGATION_MENU_QUERY);
        const paths = buildParams(data.DotcmsDocumentationCollection[0], []);
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
}: GetStaticPropsContext<ParsedUrlQuery>): Promise<GetStaticPropsResult<PageData>> {
    const variables = { urlTitle: `+DotcmsDocumentation.urltitle_dotraw:${params.urlTitle}` };
    const { DotcmsDocumentationCollection: DotcmsDocumentationNav } = await client.request(
        NAVIGATION_MENU_QUERY
    );
    const { DotcmsDocumentationCollection } = await client.request(FULL_PAGE_QUERY, variables);
    try {
        const mdxSource = await renderToString(DotcmsDocumentationCollection[0].documentation, {
            mdxOptions: {
                remarkPlugins: [DotHtmlToJsxRemark, remarkId, prism, html, DotDecodeHtml, DotToc]
            }
        });
        return {
            props: {
                data: DotcmsDocumentationCollection[0],
                navDot: DotcmsDocumentationNav,
                source: mdxSource,
                toc: toc
            }
        };
    } catch (e) {
        return {
            props: {
                data: DotcmsDocumentationCollection[0],
                navDot: DotcmsDocumentationNav,
                source: null,
                error: e.message
            }
        };
    }
}

const buildParams = (data: Documentation, paths: UrlTitleParams[]): UrlTitleParams[] => {
    if (!data.dotcmsdocumentationchildren?.length) {
        return paths;
    }
    data.dotcmsdocumentationchildren.forEach((item: Documentation) => {
        paths.push({ params: { urlTitle: item.urlTitle } });
        paths = buildParams(item, paths);
    });
    return paths;
};

interface UrlTitleParams {
    params: {
        urlTitle: string;
    };
}

export default UrlTitle;
