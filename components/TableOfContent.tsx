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
        <ul className="list-none">
            {titles.map((title) => {
                return (
                    <li
                        key={title.key}
                        className={classNames(`pl-${title.depth}`, {
                            'font-bold': title.depth === 2
                        })}
                    >
                        {title.id.length ? (
                            <a href={`#${title.id}`}>{title.value}</a>
                        ) : (
                            <a>{title.value}</a>
                        )}
                    </li>
                );
            })}
        </ul>
    );
};

export default TableOfContent;
