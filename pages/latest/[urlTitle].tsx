import React from 'react';
import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { ParsedUrlQuery } from 'querystring';

// Graphql
import { NAVIGATION_MENU_QUERY, FULL_PAGE_QUERY } from '@graphql/queries';

// Models
import { DotcmsDocumentation } from '@models/DotcmsDocumentation.model';

// Utils
import { client } from '@utils/graphql-client';

const urlTitle = ({ data }: { data: DotcmsDocumentation[] }): JSX.Element => {
    const documentation = data[0];
    return <h1>{documentation.title}</h1>;
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
        throw new Error('Something went wrong in getStaticPaths');
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

export async function getStaticProps({
    params
}: GetStaticPropsContext<ParsedUrlQuery>): Promise<
    GetStaticPropsResult<{ data: DotcmsDocumentation }>
> {
    try {
        const variables = { urlTitle: `+DotcmsDocumentation.urltitle_dotraw:${params.urlTitle}` };
        const { DotcmsDocumentationCollection } = await client.request(FULL_PAGE_QUERY, variables);

        return {
            props: {
                data: DotcmsDocumentationCollection
            }
        };
    } catch (e) {
        throw new Error('Something went wrong in getStaticProps');
    }
}

interface UrlTitleParams {
    params: {
        urlTitle: string;
    };
}

export default urlTitle;
