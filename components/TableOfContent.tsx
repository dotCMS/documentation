import React from 'react';
import classNames from 'classnames';

export interface TableContentModel {
    id: string;
    depth: number;
    value: string;
    key: string;
}

const TableOfContent = ({ titles }: { titles: TableContentModel[] }): JSX.Element => {
    return (
        <ul className="list-none p-0">
            {titles.map((title) => {
                return (
                    <li key={title.key} className={classNames(`pl-${title.depth}`)}>
                        {title.id.length ? (
                            <a className="font-roboto text-sm text-gray" href={`#${title.id}`}>
                                {title.value}
                            </a>
                        ) : (
                            <a className="font-roboto text-sm text-gray">{title.value}</a>
                        )}
                    </li>
                );
            })}
        </ul>
    );
};

export default TableOfContent;
