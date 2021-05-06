import React from 'react';
import { GetStaticPropsResult } from 'next';
import Head from 'next/head';
import Container from '@styles/Container.styles';

// Graphql
import { NAVIGATION_MENU_QUERY } from '@graphql/queries';

// Models
import { Documentation } from '@models/Documentation.model';

// Utils
import { client } from '@utils/graphql-client';

export default function Home(): JSX.Element {
    return (
        <Container>
            <Head>
                <title>Documentation</title>
                <link href="/favicon.ico" rel="icon" />
            </Head>
            <div>
                <h1>dotCMS Documentation</h1>
            </div>
        </Container>
    );
}

export async function getStaticProps(): Promise<GetStaticPropsResult<{ navDot: Documentation }>> {
    try {
        const { DotcmsDocumentationCollection } = await client.request(NAVIGATION_MENU_QUERY);
        return {
            props: {
                navDot: DotcmsDocumentationCollection
            }
        };
    } catch (e) {
        throw new Error(e);
    }
}
