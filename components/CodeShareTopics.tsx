import React from 'react';
import Link from 'next/link';

// Interfaces
import { CodeShareTopic } from '@models/CodeShare.model';

export const CodeShareTopics = ({ topics }: { topics: CodeShareTopic[] }): JSX.Element => {
    return (
        <ul className="list-none">
            {topics.map((topic, index) => (
                <li key={index}>
                    <Link href={`/codeshare/topic/${topic.link}/1`}>
                        <a className="no-underline text-blue-500">{topic.title}</a>
                    </Link>
                </li>
            ))}
        </ul>
    );
};
