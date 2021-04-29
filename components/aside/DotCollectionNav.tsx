import React, { useState } from 'react';
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
    const [active, setActive] = useState(null);

    if (!data.dotcmsdocumentationchildren?.length) {
        return null;
    }
    return (
        <>
            <ul className={classNames('list-none', { hidden: hide })}>
                {data.dotcmsdocumentationchildren.map((item: DotcmsDocumentation) => {
                    const haveChild = !!item.dotcmsdocumentationchildren?.length;

                    return (
                        <li
                            key={item.navTitle || item.title}
                            className={classNames({
                                'list-menu-bulle-rotated': haveChild && active === item.urlTitle,
                                'list-menu-bullet': haveChild
                            })}
                        >
                            <Link href={`/latest/${item.urlTitle}`}>
                                <a
                                    className="font-normal font-roboto text-sm text-gray"
                                    onClick={() => {
                                        if (item.urlTitle === active) {
                                            setActive(null);
                                        } else {
                                            setActive(item.urlTitle);
                                        }
                                    }}
                                >
                                    {item.navTitle || item.title}
                                </a>
                            </Link>
                            <DotCollectionNav data={item} hide={active !== item.urlTitle} />
                        </li>
                    );
                })}
            </ul>
        </>
    );
}
