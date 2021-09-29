import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';

// Interfaces
import { CodeShareTopic } from '@models/CodeShare.model';

export const CodeShareTopics = ({
    topics,
    tag
}: {
    topics: CodeShareTopic[];
    tag: string;
}): JSX.Element => {
    return (
        <ul className="list-none">
            {topics.map((topic, index) => (
                <li key={index}>
                    <Link href={`/codeshare/topic/${topic.link}`}>
                        <a
                            className={classNames(
                                'no-underline text-blue-500',
                                tag == topic.link && 'font-bold'
                            )}
                        >
                            {topic.title}
                        </a>
                    </Link>
                </li>
            ))}
        </ul>
    );
};
