/* eslint-disable react/prop-types */
import React, { Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';
import { TableContentModel } from '@models/TableOfConent.model';

export const TableOfContentListItem = ({
    title,
    active,
    setActive
}: {
    title: TableContentModel;
    active: string;
    setActive?: Dispatch<SetStateAction<null | string>>;
}): JSX.Element => {
    const linkClasses = ['text-gray-500', 'no-underline'];
    return (
        <>
            {title.id ? (
                <a
                    className={classNames(linkClasses, {
                        'font-bold': active == title.id
                    })}
                    href={`#${title.id}`}
                    onClick={() => {
                        setActive(title.id);
                    }}
                >
                    {title.value}
                </a>
            ) : (
                <a
                    className={classNames(linkClasses, {
                        'font-bold': active == title.value
                    })}
                    onClick={() => setActive(title.id)}
                >
                    {title.value}
                </a>
            )}
        </>
    );
};
