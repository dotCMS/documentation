import React from 'react';
import { TableContentModel } from '@models/TableOfConent.model';

const TableOfContent = ({ titles }: { titles: TableContentModel[] }): JSX.Element => {
    if (!titles?.length) {
        return null;
    }
    return (
        <ul className="list-none pl-3">
            {titles.map((title) => {
                return (
                    <li key={title.key}>
                        {title.id.length ? (
                            <a className="font-roboto text-sm text-gray" href={`#${title.id}`}>
                                {title.value}
                            </a>
                        ) : (
                            <a className="font-roboto text-sm text-gray">{title.value}</a>
                        )}
                        <TableOfContent titles={title.children} />
                    </li>
                );
            })}
        </ul>
    );
};

export default TableOfContent;
