import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Container from '@styles/Container.styles';

// Graphql
import { NAVIGATION_MENU_QUERY } from '../graphql/queries';
import { GraphQLClient } from 'graphql-request';

// Interfaces
import { DotcmsDocumentation, NavigationProp } from '../models/dotcmsDocumentation.interface';

const BASE_URL = 'https://dotcms.com/api/v1/graphql';

export default function Home({ data }: { data: DotcmsDocumentation[] }): JSX.Element {
    return (
        <Container>
            <Head>
                <title>Documentation</title>
                <link href="/favicon.ico" rel="icon" />
            </Head>
            <nav>
                <DotCollection data={data[0]} />
            </nav>
        </Container>
    );
}

const DotCollection = ({ data }: { data: DotcmsDocumentation }) => {
    if (!data.dotcmsdocumentationchildren?.length) {
        return null;
    }

    return (
        <ul>
            {data.dotcmsdocumentationchildren.map((item: DotcmsDocumentation) => (
                <li key={item.navTitle || item.title}>
                    <Link href={item.urlMap.replace('/docs', '')}>
                        <a>{item.navTitle || item.title}</a>
                    </Link>
                    <DotCollection data={item} />
                </li>
            ))}
        </ul>
    );
};

export async function getStaticProps(): Promise<NavigationProp> {
    try {
        const client = new GraphQLClient(BASE_URL);
        const data = await client.request(NAVIGATION_MENU_QUERY);
        return {
            props: {
                data: data.DotcmsDocumentationCollection
            }
        };
    } catch (e) {
        throw new Error('Something went wrong...');
    }
}
