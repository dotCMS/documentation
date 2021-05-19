import React from 'react';
import classNames from 'classnames';
import { TableContentModel } from '@models/TableOfConent.model';

const TableOfContent = ({
    titles,
    active
}: {
    titles: TableContentModel[];
    active?: string;
}): JSX.Element => {
    if (!titles?.length) {
        return null;
    }
    return (
        <ul className="list-none pl-3">
            {titles.map((title) => {
                return (
                    <li key={title.key}>
                        {title.id.length ? (
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
                        <TableOfContent active={active} titles={title.children} />
                    </li>
                );
            })}
        </ul>
    );
};

export default TableOfContent;
