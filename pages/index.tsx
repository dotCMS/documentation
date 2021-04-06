import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Container from '@styles/Container.styles';

// Graphql
import { useQuery } from 'urql';
import { NAVIGATION_MENU_QUERY } from '../src/graphql/queries';

export default function Home(): JSX.Element {
    const [result] = useQuery({
        query: NAVIGATION_MENU_QUERY,
        variables: { url: '+urlMap:/docs/latest/table-of-contents' }
    });

    const { data, fetching, error } = result;

    if (fetching) return <p>Loading...</p>;
    if (error) return <p>Oh no... {error.message}</p>;

    return (
        <Container>
            <Head>
                <title>Documentation</title>
                <link href="/favicon.ico" rel="icon" />
            </Head>
            <nav>
                <DotCollection data={data.DotcmsDocumentationCollection[0]} />
            </nav>
        </Container>
    );
}

const DotCollection = ({ data }: any) => {
    if (!data.dotcmsdocumentationchildren) {
        return null;
    }

    return (
        <ul>
            {data.dotcmsdocumentationchildren.map((item) => (
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
