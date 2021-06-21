import React, { useState, Dispatch, SetStateAction } from 'react';
import Link from 'next/link';
import classNames from 'classnames';

// Models
import { Documentation } from '@models/Documentation.model';

export const SideNav = ({
    data,
    hide = false,
    topLevel = true
}: {
    data: Documentation;
    hide?: boolean;
    topLevel?: boolean;
}): JSX.Element => {
    const [navItem, setNavItem] = useState({
        showSubList: null,
        active: null
    });

    if (!data?.dotcmsdocumentationchildren?.length) {
        return null;
    }
    return (
        <>
            <ul className={classNames('list-none mb-0', { hidden: hide })}>
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
                            <SideNavItem
                                item={item}
                                navItem={navItem}
                                setNavItem={setNavItem}
                                topLevel={topLevel}
                            />
                            <SideNav
                                data={item}
                                hide={navItem.showSubList !== item.urlTitle}
                                topLevel={false}
                            />
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

const SideNavItem = ({
    item,
    navItem,
    setNavItem,
    topLevel
}: {
    item: Documentation;
    navItem: { showSubList: string; active: string };
    setNavItem: Dispatch<SetStateAction<{ showSubList: string; active: string }>>;
    topLevel: boolean;
}) => {
    const active = navItem.active === item.urlTitle;
    const activeState = (item) => {
        if (item.urlTitle === navItem.active && navItem.showSubList) {
            setNavItem({
                showSubList: null,
                active: item.urlTitle
            });
        } else if (item.dotcmsdocumentationchildren?.length) {
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
                className={classNames('text-gray-150 no-underline', {
                    'font-bold': active || topLevel,
                    'text-purple': active && topLevel
                })}
                onClick={() => activeState(item)}
            >
                {item.navTitle || item.title}
            </a>
        </Link>
    );
};
