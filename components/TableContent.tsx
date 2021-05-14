import React from 'react';
import classNames from 'classnames';

export interface TableContentModel {
    id: string;
    depth: number;
    value: string;
    key: string;
}

const TableContent = ({ table }: { table: TableContentModel[] }): JSX.Element => {
    return (
        <ul className="list-none">
            {table.map((tab) => {
                return (
                    <li
                        key={tab.key}
                        className={classNames(`pl-${tab.depth}`, { 'font-bold': tab.depth === 2 })}
                    >
                        {tab.id.length ? (
                            <a href={`#${tab.id}`}>{tab.value}</a>
                        ) : (
                            <a>{tab.value}</a>
                        )}
                    </li>
                );
            })}
        </ul>
    );
};

export default TableContent;
