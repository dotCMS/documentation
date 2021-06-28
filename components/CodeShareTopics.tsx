import React from 'react';
import { useRouter } from 'next/dist/client/router';

export const CodeShareTopics = (): JSX.Element => {
    const router = useRouter();
    const topics = [
        { tag: 'All Codeshare', link: '' },
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
        <div>
            <h2>Topics</h2>
            <ul className="list-none">
                {topics.map((topic, index) => (
                    <li key={index}>
                        <a
                            className="no-underline text-blue-500 cursor-pointer"
                            onClick={() =>
                                router.push(`/codeshare${topic.link ? `?tag=${topic.link}` : ''}`)
                            }
                        >
                            {topic.tag}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};
