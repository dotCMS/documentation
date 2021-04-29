import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';

// Models
import { DotcmsDocumentation } from '@models/DotcmsDocumentation.model';

export default function DotCollectionNav({
    data,
    hide = false
}: {
    data: DotcmsDocumentation;
    hide?: boolean;
}): JSX.Element {
    if (!data.dotcmsdocumentationchildren?.length) {
        return null;
    }
    return (
        <ul className={classNames('list-none', { hidden: hide })}>
            {data.dotcmsdocumentationchildren.map((item: DotcmsDocumentation) => (
                <li key={item.navTitle || item.title} className="list-menu-bullet">
                    <Link href={`/latest/${item.urlTitle}`}>
                        <a
                            className="font-normal font-roboto text-sm text-gray"
                            onClick={toggleList}
                        >
                            {item.navTitle || item.title}
                        </a>
                    </Link>
                    <DotCollectionNav data={item} hide={true} />
                </li>
            ))}
        </ul>
    );
}

const toggleList = (e) => {
    if (e.target.nextSibling) {
        e.target.parentElement.classList.toggle('list-menu-bulle-rotated');
        e.target.nextSibling.classList.toggle('hidden');
    }
};
