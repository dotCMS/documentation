import React, { useState } from 'react';
import Link from 'next/link';
import classNames from 'classnames';

// Models
import { Documentation } from '@models/Documentation.model';

export default function SideNav({
    data,
    hide = false
}: {
    data: Documentation;
    hide?: boolean;
}): JSX.Element {
    const [active, setActive] = useState(null);

    if (!data?.dotcmsdocumentationchildren?.length) {
        return null;
    }
    return (
        <>
            <ul className={classNames('list-none', { hidden: hide })}>
                {data.dotcmsdocumentationchildren.map((item: Documentation) => {
                    const haveChild = !!item.dotcmsdocumentationchildren?.length;

                    return (
                        <li
                            key={item.navTitle || item.title}
                            className={classNames({
                                'list-menu-bulle-rotated': haveChild && active === item.urlTitle,
                                'list-menu-bullet': haveChild
                            })}
                        >
                            <SideNavItem active={active} item={item} setActive={setActive} />
                            <SideNav data={item} hide={active !== item.urlTitle} />
                        </li>
                    );
                })}
            </ul>
        </>
    );
}

const SideNavItem = ({
    item,
    active,
    setActive
}: {
    item: Documentation;
    active: null | string;
    setActive: React.Dispatch<null | string>;
}) => {
    return (
        <>
            {item.navOnly[0] ? (
                <a
                    className="font-normal font-roboto text-sm text-gray cursor-pointer"
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
            ) : (
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
            )}
        </>
    );
};
