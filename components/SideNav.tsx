import React, { useState, Dispatch, SetStateAction } from 'react';
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
    setActive: Dispatch<SetStateAction<null | string>>;
}) => {
    return (
        <>
            {item.navOnly[0] ? (
                <a
                    className={classNames('font-roboto text-sm text-gray cursor-pointer', {
                        'font-bold': active === item.urlTitle
                    })}
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
                        className={classNames('font-roboto text-sm text-gray', {
                            'font-bold': active === item.urlTitle
                        })}
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
