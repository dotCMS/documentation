import React from 'react';
import { GetStaticPropsResult } from 'next';
import Head from 'next/head';

// Graphql
import { NAVIGATION_MENU_QUERY } from '@graphql/queries';

// Models
import { Documentation } from '@models/Documentation.model';

// Utils
import { client } from '@utils/graphql-client';

export default function Home(): JSX.Element {
    return (
        <main className="container">
            <Head>
                <title>Documentation</title>
                <link href="/favicon.ico" rel="icon" />
            </Head>
            <h1>dotCMS Documentation</h1>
            <p>
                All Content Types in dotCMS are created from Base Content Types. There are 5
                different Base Content Types in dotCMS. All custom Content Types you create must be
                created from one of the Base Content Types, and each custom Content Type inherits
                all the fields contained in the Base Type (as well as any custom fields you add to
                your Content Type).
            </p>

            <h2>Base Types</h2>
            <p>
                Each Content Type is an instance of a Base Content Types (such as Files, Pages and
                Widgets). All Content Types of the same Base Type can be used in similar ways; for
                example, all Content Types created from the File Asset Base Type can be used in all
                ways as normal files within dotCMS. But the ability to create your own Content Types
                on top of the File Asset Base Type allows you to create different Content Types for
                different types of files - such as Documents, Images, Videos, etc. which each have
                different fields, allowing you to handle and display each file type differently on
                your site.
            </p>
            <p>
                All Content Types in dotCMS are created from Base Content Types. There are 5
                different Base Content Types in dotCMS. All custom Content Types you create must be
                created from one of the Base Content Types.
            </p>

            <h3>System Fields</h3>
            <p>
                Most Base Types contain (and require) certain system fields unique to that type of
                content. For some Base Types, it may be necessary for the system fields to be filled
                out to save content of any Content Type derived from that Base Type.
            </p>

            <p>
                Every Content Type inherits the system fields from the Base Type it is created from.
            </p>

            <h3>We need listing</h3>
            <ul>
                <li>Supported Databases</li>
                <ul>
                    <li>Configuration</li>
                    <li>Database Configuration File (db.properties)</li>
                    <li>Database Specific Requirements and Known Issues</li>
                    <ul>
                        <li>H2 Database</li>
                        <li>PostgreSQL</li>
                    </ul>
                </ul>

                <li>Important First Steps</li>
                <li>Backup (mysqldump)</li>
            </ul>

            <h4>And a table</h4>
            <table>
                <thead>
                    <tr>
                        <th>Database</th>
                        <th>dotCMS Versions Official</th>
                        <th>Links</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>PostgreSQL</td>
                        <td>All versions (Community and Enterprise</td>
                        <td>Main site / Documentation / Download</td>
                    </tr>
                    <tr>
                        <td>Microsoft SQL Server</td>
                        <td>Enterprise Professional and Enterprise</td>
                        <td>Prime only Main site</td>
                    </tr>
                    <tr>
                        <td>Oracle</td>
                        <td>Enterprise Prime only</td>
                        <td>Main site / Documentation</td>
                    </tr>
                </tbody>
            </table>

            <h4>Links</h4>
            <p>
                <a href="#">Link</a>
            </p>
        </main>
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
