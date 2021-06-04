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
    const [navItem, setNavItem] = useState({
        showSubList: null,
        active: null
    });

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
                            className={classNames(haveChild ? 'list-menu-bullet' : 'mt-2', {
                                'list-menu-bulle-rotated':
                                    haveChild && navItem.showSubList === item.urlTitle
                            })}
                        >
                            <SideNavItem item={item} navItem={navItem} setNavItem={setNavItem} />
                            <SideNav data={item} hide={navItem.showSubList !== item.urlTitle} />
                        </li>
                    );
                })}
            </ul>
        </>
    );
}

const SideNavItem = ({
    item,
    navItem,
    setNavItem
}: {
    item: Documentation;
    navItem: null | { showSubList: string; active: string };
    setNavItem: Dispatch<SetStateAction<null | { showSubList: string; active: string }>>;
}) => {
    const activeState = (item) => {
        if (item.urlTitle === navItem.active && navItem.showSubList) {
            setNavItem({
                showSubList: null,
                active: item.urlTitle
            });
        } else if (!!item.dotcmsdocumentationchildren?.length) {
            setNavItem({
                showSubList: item.urlTitle,
                active: item.urlTitle
            });
        } else {
            setNavItem({
                ...navItem,
                active: item.urlTitle
            });
        }
    };
    return (
        <Link href={`/latest/${item.urlTitle}`}>
            <a
                className={classNames('text-gray-500 cursor-pointer', {
                    'font-bold': navItem.active === item.urlTitle
                })}
                onClick={() => activeState(item)}
            >
                {item.navTitle || item.title}
            </a>
        </Link>
    );
};
