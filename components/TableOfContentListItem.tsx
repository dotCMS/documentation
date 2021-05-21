/* eslint-disable react/prop-types */
import React, { Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';
import { v4 } from 'uuid';
import { TableContentModel } from '@models/TableOfConent.model';

const TableOfContentListItem = ({
    title,
    active,
    setActive
}: {
    title: TableContentModel;
    active: string;
    setActive?: Dispatch<SetStateAction<null | string>>;
}): JSX.Element => {
    return (
        <li key={v4()}>
            {title.id ? (
                <a
                    className={classNames('text-gray', {
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
                    className={classNames('text-gray', {
                        'font-bold': active == title.value
                    })}
                    onClick={() => setActive(title.id)}
                >
                    {title.value}
                </a>
            )}
        </li>
    );
};

export default TableOfContentListItem;
