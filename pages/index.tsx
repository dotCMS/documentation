import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Container from '@styles/Container.styles';

// Graphql
import { ssrExchange, dedupExchange, cacheExchange, fetchExchange, useQuery } from 'urql';
import { NAVIGATION_MENU_QUERY } from '../src/graphql/queries';
import { withUrqlClient, initUrqlClient } from 'next-urql';

const BASE_URL = 'https://dotcms.com/api/v1/graphql';

export function Home(): JSX.Element {
    const [res] = useQuery({ query: NAVIGATION_MENU_QUERY });
    const { data } = res;
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

export async function getStaticProps(): Promise<any> {
    const ssrCache = ssrExchange({ isClient: false });
    const client = initUrqlClient(
        {
            url: BASE_URL,
            exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange]
        },
        false
    );

    await client.query(NAVIGATION_MENU_QUERY).toPromise();

    return {
        props: {
            urqlState: ssrCache.extractData()
        },
        revalidate: 600
    };
}

export default withUrqlClient(
    (ssr) => ({
        url: BASE_URL
    }),
    {
        ssr: false
    }
)(Home);
