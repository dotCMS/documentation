import React, { useEffect, useState } from 'react';
import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import html from 'remark-html';
import prism from 'remark-prism';
import remarkId from 'remark-heading-id';
import styles from '@styles/urlTitle.module.css';
import { ParsedUrlQuery } from 'querystring';

// mdx custom Plugins
import DotDecodeHtml from '@plugins/DotDecodeHtml';
import DotHtmlToJsxRemark from '@plugins/DotHtmlToJsxRemark';
import DotToc, { toc } from '@plugins/DotToc';
import DotCodeMultiline from '@plugins/DotCodeMultiline';

// Components
import { ContainerToc } from '@components/toc/ContainerToc';
import { FeedBack } from '@components/FeedBack';
import { Footer } from '@components/Footer';
import { ImageMarkdown } from '@components/ImageMarkdown';
import { LinkMarkdown } from '@components/LinkMarkdown';
import { PageError } from '@components/PageError';
import TableOfContent from '@components/toc/TableOfContent';
import TopPageToc from '@components/toc/TopPageToc';

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
    error?: string;
    pageTitle?: string;
    showSideToc?: boolean;
    toc?: TableContentModel[];
}

const componentsUI: MDXProviderComponentsProp = {
    img: ImageMarkdown,
    a: LinkMarkdown
};

const UrlTitle = ({ data, error, showSideToc, source, toc = [] }: PageData): JSX.Element => {
    const content = hydrate(source, { components: componentsUI });
    // ---- Table Of Content Active Item
    const [tocActive, setTocActive] = useState(null);
    const options = React.useMemo(
        () => ({
            root: null,
            rootMargin: '0px 0px -70% 0px',
            threshold: 1
        }),
        []
    );
    useEffect(() => {
        const timer = setTimeout(() => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setTocActive(entry.target.id);
                    }
                });
            }, options);
            const targets = document.querySelectorAll('h2,h3');
            targets.forEach((target) => observer.observe(target));
            return () => observer.disconnect();
        }, 100);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toc]);
    return (
        <>
            {error ? (
                <PageError error={error} title={data.title} />
            ) : (
                <>
                    <div className="flex flex-col overflow-auto overflow-y-scroll">
                        <main className={styles.main}>
                            <h1>{data.title}</h1>
                            <MDXProvider className="wrapper" components={componentsUI}>
                                {content}
                            </MDXProvider>
                            {data.showToc[0] && (
                                <>
                                    <h4>Table Of Content</h4>
                                    <TopPageToc data={data.dotcmsdocumentationchildren} />
                                </>
                            )}
                        </main>
                        <div>
                            <FeedBack />
                            <Footer />
                        </div>
                    </div>
                    {!!toc.length && (
                        <ContainerToc showSideToc={showSideToc}>
                            <TableOfContent
                                active={tocActive}
                                setActive={setTocActive}
                                titles={toc}
                            />
                        </ContainerToc>
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
    const { DotcmsDocumentationCollection: data } = await client.request(
        FULL_PAGE_QUERY,
        variables
    );
    try {
        const mdxSource = await renderToString(data[0].documentation, {
            mdxOptions: {
                remarkPlugins: [
                    DotHtmlToJsxRemark,
                    remarkId,
                    prism,
                    html,
                    DotCodeMultiline,
                    DotDecodeHtml,
                    DotToc
                ]
            }
        });
        return {
            props: {
                data: data[0],
                pageTitle: data[0].title,
                navDot: DotcmsDocumentationNav,
                source: mdxSource,
                toc: toc
            }
        };
    } catch (e) {
        // Don't remove this
        const mdxSource = await renderToString('');
        // If we got an error we have to send a mdxSource empty because mdx needs this variable
        // Under the hood, mdx use Hooks, we can't just no send the mdxSource
        // but it would affect the amount of hooks we would render
        // Note: we can also create another component and just call the hook when there is no error,
        // but we are doing it this way for now.
        return {
            props: {
                data: data[0],
                navDot: DotcmsDocumentationNav,
                source: mdxSource,
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
