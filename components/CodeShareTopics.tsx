import React from 'react';
import Link from 'next/link';
export const CodeShareTopics = (): JSX.Element => {
    const topics = [
        { tag: 'All Codeshare', link: 'all' },
        { tag: 'custom fields', link: 'custom-fields' },
        { tag: 'blogs', link: 'blogs' },
        { tag: 'content', link: 'content' },
        { tag: 'velocity', link: 'velocity' },
        { tag: 'api', link: 'api' },
        { tag: 'categories', link: 'categories' },
        { tag: 'contentletapi', link: 'contentletapi' },
        { tag: 'https', link: 'https' },
        { tag: 'images', link: 'images' },
        { tag: 'installation', link: 'installation' },
        { tag: 'rest', link: 'rest' },
        { tag: 'tomcat', link: 'tomcat' },
        { tag: 'wysiwyg', link: 'wysiwyg' },
        { tag: 'cli', link: 'cli' },
        { tag: 'date formatting', link: 'date-formatting' },
        { tag: 'development', link: 'development' },
        { tag: 'form handling', link: 'form-handling' },
        { tag: 'frontend development', link: 'frontend-development' },
        { tag: 'json', link: 'json' },
        { tag: 'menus and crumbtrails', link: 'menus-and-crumbtrails' }
    ];
    return (
        <ul className="list-none">
            {topics.map((topic, index) => (
                <li key={index}>
                    <Link href={`/codeshare/topic/${topic.link}/1`}>
                        <a className="cursor-pointer no-underline text-blue-500">{topic.tag}</a>
                    </Link>
                </li>
            ))}
        </ul>
    );
};
