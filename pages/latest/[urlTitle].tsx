import React, { useEffect } from 'react';
import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ParsedUrlQuery } from 'querystring';
import remarkId from 'remark-heading-id';
import DotHtmlToJsxRemark from '@plugins/DotHtmlToJsxRemark';

// Styles
import styled from 'styled-components';

// Components
import DotCollectionNav from '@components/DotCollectionNav';
import { Terminal } from '@components/DotDocumentationError';

// Graphql
import { NAVIGATION_MENU_QUERY, FULL_PAGE_QUERY } from '@graphql/queries';

// Models
import { DotcmsDocumentation } from '@models/DotcmsDocumentation.model';

// Utils
import { client } from '@utils/graphql-client';

// mdx
import renderToString from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';
import { MDXProvider } from '@mdx-js/react';
import { MdxRemote } from 'next-mdx-remote/types';
import { MDXProviderComponentsProp } from '@mdx-js/react';

import Prism from 'prismjs';

interface PageData {
    data: DotcmsDocumentation;
    navDot: DotcmsDocumentation[];
    source: MdxRemote.Source;
    error?: string;
}

const ImageMarkdown = (props) => {
    const myLoader = ({ src }) => src;
    return <Image height={500} loader={myLoader} width={500} {...props} />;
};

const LinkMarkdown = (props: { href: string; children: string }) => {
    return props.href.startsWith('#') ? (
        <a href={props.href}>{props.children}</a>
    ) : (
        <Link {...props} />
    );
};

const componentsUI: MDXProviderComponentsProp = {
    img: ImageMarkdown,
    a: LinkMarkdown
};

const ContentGrid = styled.div`
    display: grid;
    grid-template-columns: 20% calc(100% - 240px);
    width: 100vw;
`;

const urlTitle = ({ data, navDot, source, error }: PageData): JSX.Element => {
    const content = source ? hydrate(source, { components: componentsUI }) : null;

    useEffect(() => {
        Prism.highlightAll();
    }, []);
    const code = `sudo yum update -y`;
    const cssCode = `p {
    color: red;
}`;
    const jsCode = `const helloWorld = 'Hello World!';
console.log(helloWorld)`;
    return (
        <ContentGrid>
            <div className="aside-menu-container">
                <nav className="aside-menu">
                    <DotCollectionNav data={navDot[0]} />
                </nav>
            </div>
            <div className="content-container">
                <pre>
                    <code className="language-bash">{code}</code>
                </pre>
                <pre>
                    <code className="language-css">{cssCode}</code>
                </pre>
                <pre>
                    <code className="language-js">{jsCode}</code>
                </pre>
                <h1>{data.title}</h1>
                {error ? (
                    <Terminal content={error} />
                ) : (
                    <div>
                        <MDXProvider className="wrapper" components={componentsUI}>
                            {content}
                        </MDXProvider>
                    </div>
                )}
            </div>
        </ContentGrid>
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
    const data = fixHeadingMarkdown(DotcmsDocumentationCollection[0].documentation);
    try {
        const mdxSource = await renderToString(data, {
            mdxOptions: {
                remarkPlugins: [DotHtmlToJsxRemark, remarkId]
            }
        });
        return {
            props: {
                data: DotcmsDocumentationCollection[0],
                navDot: DotcmsDocumentationNav,
                source: mdxSource
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

const buildParams = (data: DotcmsDocumentation, paths: UrlTitleParams[]): UrlTitleParams[] => {
    if (!data.dotcmsdocumentationchildren?.length) {
        return paths;
    }
    data.dotcmsdocumentationchildren.forEach((item: DotcmsDocumentation) => {
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

const fixHeadingMarkdown = (data: string): string => {
    const patter = new RegExp(/[(|{]*#[a-zA-Z0-9]+/gi);
    const newData = data.replace(patter, (match) => {
        return match.includes('(') || match.includes('{') ? match : match.replace('#', '# ');
    });
    return newData;
};

export default urlTitle;
