import React, { useState, Dispatch, SetStateAction } from 'react';
import Link from 'next/link';
import classNames from 'classnames';

// Models
import { Documentation } from '@models/Documentation.model';
import { useEffect } from 'react';

interface SideNavProps {
    data: Documentation;
    page: string;
    stateBreadCrumb: string[];
    setBreadCrumb: Dispatch<SetStateAction<string[]>>;
    breadCrumb?: string[];
    hide?: boolean;
    topLevel?: boolean;
}

export const SideNav = ({
    data,
    page,
    setBreadCrumb,
    stateBreadCrumb,
    breadCrumb = [],
    hide = false,
    topLevel = true
}: SideNavProps): JSX.Element => {
    const [navItem, setNavItem] = useState({
        showSubList: null,
        active: null
    });
    useEffect(() => {
        if (breadCrumb.includes(page)) {
            setBreadCrumb(breadCrumb);
        }
    }, []);
    if (!data?.dotcmsdocumentationchildren?.length) {
        return null;
    }
    return (
        <>
            <ul className={classNames('list-none mb-0', { hidden: hide })}>
                {data.dotcmsdocumentationchildren.map((item: Documentation) => {
                    const haveChild = !!item.dotcmsdocumentationchildren?.length;
                    const breadCrumbItem = [...breadCrumb, item.urlTitle];
                    const hide =
                        navItem.showSubList !== item.urlTitle &&
                        !stateBreadCrumb.includes(item.urlTitle);
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
                                setBreadCrumb={setBreadCrumb}
                                setNavItem={setNavItem}
                                stateBreadCrumb={stateBreadCrumb}
                                topLevel={topLevel}
                            />
                            <SideNav
                                breadCrumb={breadCrumbItem}
                                data={item}
                                hide={hide}
                                page={page}
                                setBreadCrumb={setBreadCrumb}
                                stateBreadCrumb={stateBreadCrumb}
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
    stateBreadCrumb,
    setBreadCrumb,
    topLevel
}: {
    item: Documentation;
    navItem: { showSubList: string; active: string };
    setNavItem: Dispatch<SetStateAction<{ showSubList: string; active: string }>>;
    setBreadCrumb: Dispatch<SetStateAction<string[]>>;
    stateBreadCrumb: string[];
    topLevel: boolean;
}) => {
    const active = navItem.active === item.urlTitle;
    const activeState = (item) => {
        setBreadCrumb([]);
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
                    'font-bold': active || topLevel || stateBreadCrumb.includes(item.urlTitle),
                    'text-purple': active && topLevel
                })}
                onClick={() => activeState(item)}
            >
                {item.navTitle || item.title}
            </a>
        </Link>
    );
};
