import { Documentation } from '@models/Documentation.model';
import Link from 'next/link';
import React from 'react';
import { v4 } from 'uuid';

const TopPageToc = ({ data = [] }: { data: Documentation[] }): JSX.Element => {
    if (!data.length) {
        return null;
    }
    return (
        <ul className="pl-3">
            {data.map((item) => {
                return (
                    <li key={v4()}>
                        <Link href={`/latest/${item.urlTitle}`}>
                            <a className="font-roboto text-sm text-gray cursor-pointer">
                                {item.navTitle || item.title}
                            </a>
                        </Link>
                        <TopPageToc data={item.dotcmsdocumentationchildren} />
                    </li>
                );
            })}
        </ul>
    );
};

export default React.memo(TopPageToc);
