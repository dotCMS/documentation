import React, { useState, Dispatch, SetStateAction } from 'react';
import Link from 'next/link';
import classNames from 'classnames';

// Models
import { Documentation } from '@models/Documentation.model';
import { useEffect } from 'react';

interface SideNavProps {
    data: Documentation;
    docPage?: string;
    level?: number;
    breadCrumb?: string[];
    hide?: boolean;
    search?: boolean;
    topLevel?: boolean;
}

export const SideNav = ({
    data,
    breadCrumb,
    level = 0,
    hide = false,
    topLevel = true
}: SideNavProps): JSX.Element => {
    const [navItem, setNavItem] = useState({
        showSubList: null,
        active: null
    });
    useEffect(() => {
        setNavItem({
            showSubList: breadCrumb[level],
            active: breadCrumb[level]
        });
    }, [breadCrumb]);
    if (!data?.dotcmsdocumentationchildren?.length) {
        return null;
    }
    return (
        <>
            <ul className={classNames('list-none mb-0', { hidden: hide })}>
                {data.dotcmsdocumentationchildren.map((item: Documentation) => {
                    const haveChild = !!item.dotcmsdocumentationchildren?.length;
                    const hide = navItem.showSubList !== item.urlTitle;
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
                                breadCrumb={breadCrumb}
                                data={item}
                                hide={hide}
                                level={level + 1}
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
        <Link href={`/${item.urlTitle}`}>
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
