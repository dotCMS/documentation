import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Container from '@styles/Container.styles';

// Graphql
import { NAVIGATION_MENU_QUERY } from '../graphql/queries';
import { GraphQLClient } from 'graphql-request';

const BASE_URL = 'https://dotcms.com/api/v1/graphql';

export default function Home({ data }: DotcmsDocumentationCollection): JSX.Element {
    return (
        <Container>
            <Head>
                <title>Documentation</title>
                <link href="/favicon.ico" rel="icon" />
            </Head>
            <h1>Hey</h1>
            <nav>
                <DotCollection data={data.DotcmsDocumentationCollection[0]} />
            </nav>
        </Container>
    );
}

const DotCollection = ({ data }: DotcmsDocumentationData) => {
    if (!data.dotcmsdocumentationchildren) {
        return null;
    }

    return (
        <ul>
            {data.dotcmsdocumentationchildren.map((item: DotcmsDocumentation) => (
                <li key={item.navTitle || item.title}>
                    <Link href={item.urlMap}>
                        <a>{item.navTitle || item.title}</a>
                    </Link>
                    <DotCollection data={item} />
                </li>
            ))}
        </ul>
    );
};

export async function getStaticProps(): Promise<NavigationProp> {
    const client = new GraphQLClient(BASE_URL);
    const data = await client.request(NAVIGATION_MENU_QUERY);
    return {
        props: {
            data
        }
    };
}

// Interfaces
interface NavigationProp {
    props: {
        data: DotcmsDocumentationCollection;
    };
}

interface DotcmsDocumentationCollection {
    data: {
        DotcmsDocumentationCollection: DotcmsDocumentation[];
    };
}

interface DotcmsDocumentationData {
    data: DotcmsDocumentation;
}

interface DotcmsDocumentation {
    title: string;
    navTitle: string | null;
    urlMap: string;
    dotcmsdocumentationchildren?: DotcmsDocumentation[];
}
