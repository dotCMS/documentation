import React from 'react';
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

// Html to ReactJS
import parse, { attributesToProps } from 'html-react-parser';
import { HTMLReactParserOptions } from 'html-react-parser';
import { Element, DataNode } from 'domhandler/lib/node';

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
    grid-template-columns: 16rem 1fr;
`;

const urlTitle = ({ data, navDot, source, error }: PageData): JSX.Element => {
    const content = source ? hydrate(source, { components: componentsUI }) : null;
    return (
        <ContentGrid>
            <nav>
                <DotCollectionNav data={navDot[0]} />
            </nav>
            <h1>{data.title}</h1>
            <h2>{data.format}</h2>
            {data.format === 'html' ? (
                <div>{parse(data.documentation, htmlToReactOptions)}</div>
            ) : error ? (
                <Terminal content={error} />
            ) : (
                <div>
                    <MDXProvider className="wrapper" components={componentsUI}>
                        {content}
                    </MDXProvider>
                </div>
            )}
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
    const format = DotcmsDocumentationCollection[0].format;
    const data = fixHeadingMarkdown(DotcmsDocumentationCollection[0].documentation);
    try {
        const mdxSource =
            format === 'markdown'
                ? await renderToString(data, {
                      mdxOptions: {
                          remarkPlugins: [DotHtmlToJsxRemark, remarkId]
                      }
                  })
                : null;
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

const htmlToReactOptions: HTMLReactParserOptions = {
    htmlparser2: {
        xmlMode: true
    },
    replace: (element: Element): JSX.Element => {
        if (element.type === 'tag') {
            if (element.name === 'img') {
                const props = attributesToProps(element.attribs);
                return <ImageMarkdown {...props} />;
            }
            if (element.name === 'a') {
                const props = attributesToProps(element.attribs);
                const children = element.children[0] as DataNode;
                const propsLink = {
                    href: props.href,
                    children: children.data
                };
                return <LinkMarkdown {...propsLink} />;
            }
            if (element.name === 'span') {
                const children = element.children[0] as DataNode;
                return <span>{children.data}</span>;
            }
            if (element.name === 'br') {
                return <br />;
            }
        }
    }
};

const HtmlToReactJS = `
<section class="galeria" id="galeria">
    <img src="/dA/73434262-cd90-4d52-b887-5a2f73f3d476/diagram1" alt="Imagen 1" />
    <div class="foto">
        <img src="/dA/73434262-cd90-4d52-b887-5a2f73f3d476/diagram1" alt="Imagen 2">
    </div>
    <div class="foto">
        <img src="/dA/73434262-cd90-4d52-b887-5a2f73f3d476/diagram1" alt="Imagen 3">
    </div>
    <div class="foto">
        <img src="/dA/73434262-cd90-4d52-b887-5a2f73f3d476/diagram1" alt="Imagen 4">
    </div>
    <br>
    <a href="branding-basic-information">Enlace</a>
</section>`;

export default urlTitle;
