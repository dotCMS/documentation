import React from 'react';
import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ParsedUrlQuery } from 'querystring';

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

const image = (props) => {
    const myLoader = ({ src, width, quality }) => {
        return `${src}?w=${width}&q=${quality || 75}`;
    };
    return (
        <div style={{ position: 'relative', width: 'auto', height: 'auto' }}>
            <Image height={500} loader={myLoader} width={500} {...props} />
        </div>
    );
};

// const link = (props) => <Link href={""} {...props} passHref/>;

const componentsUI: MDXProviderComponentsProp = {
    img: image
    // a: link
};

const urlTitle = ({
    data,
    source
}: {
    data: DotcmsDocumentation;
    source: MdxRemote.Source;
}): JSX.Element => {
    const content = hydrate(source, { components: componentsUI });
    return (
        <>
            <h1>{data.title}</h1>
            <MDXProvider className="wrapper" components={componentsUI}>
                {content}
            </MDXProvider>
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
}: GetStaticPropsContext<ParsedUrlQuery>): Promise<
    GetStaticPropsResult<{ data: DotcmsDocumentation; source: MdxRemote.Source }>
> {
    try {
        const variables = { urlTitle: `+DotcmsDocumentation.urltitle_dotraw:${params.urlTitle}` };
        const { DotcmsDocumentationCollection } = await client.request(FULL_PAGE_QUERY, variables);
        const mdxSource = await renderToString(DotcmsDocumentationCollection[0].documentation, {
            components: componentsUI
        });
        return {
            props: {
                data: DotcmsDocumentationCollection[0],
                source: mdxSource
            }
        };
    } catch (e) {
        throw new Error(e);
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

export default urlTitle;
