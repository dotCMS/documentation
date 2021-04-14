import React from 'react';
import ReactDOM from 'react-dom';
import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ParsedUrlQuery } from 'querystring';

// Styles
import styled from 'styled-components';

// Components
import DotCollectionNav from '../../components/DotCollectionNav';

// Graphql
import { NAVIGATION_MENU_QUERY, FULL_PAGE_QUERY } from '@graphql/queries';

// Models
import { DotcmsDocumentation } from '@models/DotcmsDocumentation.model';

// Utils
import { client } from '@utils/graphql-client';

// mdx
import ReactMarkdown from 'react-markdown';
import { MDXProviderComponentsProp } from '@mdx-js/react';

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

const BrMarkdown = () => <br />;

const componentsUI: MDXProviderComponentsProp = {
    img: ImageMarkdown,
    a: LinkMarkdown,
    br: BrMarkdown
};

const ContentGrid = styled.div`
    display: grid;
    grid-template-columns: 16rem 1fr;
`;

const urlTitle = ({
    data,
    navDot
}: {
    data: DotcmsDocumentation;
    navDot: DotcmsDocumentation[];
}): JSX.Element => {
    if (typeof window !== 'undefined') {
        ReactDOM.render(
            <ReactMarkdown>{data.documentation}</ReactMarkdown>,
            document.getElementById('div')
        );
    }
    return (
        <ContentGrid>
            <nav>
                <DotCollectionNav data={navDot[0]} />
            </nav>
            <div id="div" />
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
}: GetStaticPropsContext<ParsedUrlQuery>): Promise<
    GetStaticPropsResult<{
        data: DotcmsDocumentation;
        navDot: DotcmsDocumentation[];
    }>
> {
    try {
        const variables = { urlTitle: `+DotcmsDocumentation.urltitle_dotraw:${params.urlTitle}` };
        const { DotcmsDocumentationCollection: DotcmsDocumentationNav } = await client.request(
            NAVIGATION_MENU_QUERY
        );
        const { DotcmsDocumentationCollection } = await client.request(FULL_PAGE_QUERY, variables);
        return {
            props: {
                data: DotcmsDocumentationCollection[0],
                navDot: DotcmsDocumentationNav
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
