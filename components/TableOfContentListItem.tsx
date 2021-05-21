/* eslint-disable react/prop-types */
import React from 'react';
import classNames from 'classnames';
import { v4 } from 'uuid';
import { TableContentModel } from '@models/TableOfConent.model';

const TableOfContentListItem = ({
    title,
    active
}: {
    title: TableContentModel;
    active: string;
}): JSX.Element => {
    return (
        <li key={v4()}>
            {title.id ? (
                <a
                    className={classNames('text-gray', {
                        'font-bold': active == title.id
                    })}
                    href={`#${title.id}`}
                >
                    {title.value}
                </a>
            ) : (
                <a
                    className={classNames('text-gray', {
                        'font-bold': active == title.value
                    })}
                >
                    {title.value}
                </a>
            )}
        </li>
    );
};

export default TableOfContentListItem;
