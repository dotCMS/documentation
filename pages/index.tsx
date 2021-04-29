import React from 'react';
import { GetStaticPropsResult } from 'next';
import Head from 'next/head';
import Container from '@styles/Container.styles';

// Components
import SideNav from '@components/SideNav';

// Graphql
import { NAVIGATION_MENU_QUERY } from '@graphql/queries';

// Models
import { Documentation } from '@models/Documentation.model';

// Utils
import { client } from '@utils/graphql-client';

export default function Home({ data }: { data: Documentation[] }): JSX.Element {
    return (
        <Container>
            <Head>
                <title>Documentation</title>
                <link href="/favicon.ico" rel="icon" />
            </Head>
            <nav>
                <SideNav data={data[0]} />
            </nav>
        </Container>
    );
}

export async function getStaticProps(): Promise<GetStaticPropsResult<{ data: Documentation }>> {
    try {
        const { DotcmsDocumentationCollection } = await client.request(NAVIGATION_MENU_QUERY);
        return {
            props: {
                data: DotcmsDocumentationCollection
            }
        };
    } catch (e) {
        throw new Error(e);
    }
}
