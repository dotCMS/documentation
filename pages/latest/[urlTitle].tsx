import React from 'react';
import { GetStaticPathsResult, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'node:querystring';

// Graphql
import { NAVIGATION_MENU_QUERY, FULL_PAGE_QUERY } from '@graphql/queries';

// Interfaces
import { DotcmsDocumentation, NavigationProp } from '@models/dotcmsDocumentation.interface';

// Utils
import { client } from '@utils/graphql-client';

const urlTitle = ({ data }: { data: DotcmsDocumentation[] }): JSX.Element => {
    const documentation = data[0];
    return <h1>{documentation.title}</h1>;
};

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
    const data = await client.request(NAVIGATION_MENU_QUERY);
    const paths = buildParams(data.DotcmsDocumentationCollection[0], []);
    return {
        paths,
        fallback: false
    };
}

const buildParams = (data, paths): UrlTitleParams[] => {
    if (!data.dotcmsdocumentationchildren?.length) {
        return paths;
    }
    data.dotcmsdocumentationchildren.map((item: DotcmsDocumentation) => {
        paths.push({ params: { urlTitle: item.urlTitle } });
        paths = buildParams(item, paths);
    });
    return paths;
};

export async function getStaticProps({
    params
}: GetStaticPropsContext<ParsedUrlQuery>): Promise<NavigationProp> {
    const variables = { urlTitle: `+DotcmsDocumentation.urltitle_dotraw:${params.urlTitle}` };
    const { DotcmsDocumentationCollection } = await client.request(FULL_PAGE_QUERY, variables);

    return {
        props: {
            data: DotcmsDocumentationCollection
        }
    };
}

interface UrlTitleParams {
    params: {
        urlTitle: string;
    };
}

export default urlTitle;
