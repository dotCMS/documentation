import React from 'react';
import Link from 'next/link';

// Models
import { DotcmsDocumentation } from '../models/DotcmsDocumentation.model';

export default function DotCollectionNav({ data }: { data: DotcmsDocumentation }): JSX.Element {
    if (!data.dotcmsdocumentationchildren?.length) {
        return null;
    }

    return (
        <ul>
            {data.dotcmsdocumentationchildren.map((item: DotcmsDocumentation) => (
                <li key={item.navTitle || item.title}>
                    <Link href={`/latest/${item.urlTitle}`}>
                        <a className="aside-menu-link">{item.navTitle || item.title}</a>
                    </Link>
                    <DotCollectionNav data={item} />
                </li>
            ))}
        </ul>
    );
}
