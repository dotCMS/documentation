import React from 'react';
import Link from 'next/link';

export const CodeShareTopics = (): JSX.Element => {
    const topics = [
        'All Codeshare',
        'custom fields',
        'blogs',
        'content',
        'velocity',
        'api',
        'categories',
        'contentletapi',
        'https',
        'images',
        'installation',
        'rest',
        'tomcat',
        'wysiwyg',
        'cli',
        'date formatting',
        'development',
        'form handling',
        'frontend development',
        'json',
        'menus and crumbtrails'
    ];
    return (
        <div>
            <h2>Topics</h2>
            <ul className="list-none">
                {topics.map((topic, index) => (
                    <li key={index}>
                        <Link href="/codeshare?tag=hola">
                            <a className="no-underline text-blue-500">{topic}</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};
