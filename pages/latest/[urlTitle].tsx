import React from 'react';

// Graphql
import { NAVIGATION_MENU_QUERY, FULL_PAGE_QUERY } from '../../graphql/queries';
import { GraphQLClient } from 'graphql-request';

// Interfaces
import { DotcmsDocumentation, NavigationProp } from '../../models/dotcmsDocumentation.interface';

const BASE_URL = 'https://dotcms.com/api/v1/graphql';
const client = new GraphQLClient(BASE_URL);
const paths = [];

const urlTitle = ({ data }: { data: DotcmsDocumentation[] }): JSX.Element => {
    const documentation = data[0];
    return <h1>{documentation.title}</h1>;
};

export async function getStaticPaths() {
    const data = await client.request(NAVIGATION_MENU_QUERY);
    buildParams(data.DotcmsDocumentationCollection[0]);
    return {
        paths: paths,
        fallback: false
    };
}

const buildParams = (data): void => {
    if (!data.dotcmsdocumentationchildren?.length) {
        return null;
    }
    data.dotcmsdocumentationchildren.map((item) => {
        paths.push({ params: { urlTitle: item.urlTitle } });
        buildParams(item);
    });
};
export async function getStaticProps({ params }: { params: urlTitle }): Promise<NavigationProp> {
    const variables = { urlTitle: `+DotcmsDocumentation.urltitle_dotraw:${params.urlTitle}` };
    const data = await client.request(FULL_PAGE_QUERY, variables);

    return {
        props: {
            data: data.DotcmsDocumentationCollection
        }
    };
}

interface urlTitle {
    urlTitle: string;
}

export default urlTitle;
