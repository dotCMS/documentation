import React from 'react';
import { GetStaticPropsResult } from 'next';

// Components
import { FeedBack } from '@components/FeedBack';
import { Footer } from '@components/Footer';
import { CodeSharePost } from '@components/CodeSharePost';
import { CodeShareTopics } from '@components/CodeShareTopics';

// Graphql
import { CODE_SHARE_PATHS_QUERY } from '@graphql/queries';

// Utils
import { client } from '@utils/graphql-client';

// Models
import { codeshareArticle } from '@models/CodeShare.model';

export default function Home({ data }: { data: codeshareArticle[] }): JSX.Element {
    return (
        <>
            <div className="flex flex-col overflow-auto">
                <div className="container flex flex-grow mx-auto px-16">
                    <main className="container">
                        <h1 className="mb-0">Code Share</h1>
                        <h2 className="mb-10 mt-0">Recent Submissions</h2>
                        {data.map((item) => (
                            <CodeSharePost key={item.urlTitle} data={item} />
                        ))}
                    </main>
                    <CodeShareTopics />
                </div>
                <div>
                    <FeedBack />
                    <Footer />
                </div>
            </div>
        </>
    );
}

export async function getStaticProps(): Promise<
    GetStaticPropsResult<{ data: codeshareArticle[] }>
> {
    try {
        const { CodeshareCollection } = await client.request(CODE_SHARE_PATHS_QUERY);
        return {
            props: {
                data: CodeshareCollection as codeshareArticle[]
            }
        };
    } catch (e) {
        throw new Error(e);
    }
}
