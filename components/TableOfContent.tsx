import React from 'react';
import classNames from 'classnames';
import { TableContentModel } from '@models/TableOfConent.model';
import TableOfContentListItem from './TableOfContentListItem'
import { v4 } from 'uuid';

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
                    <>
                        <TableOfContentListItem key={v4()} title={title} active={active} />
                        <TableOfContent key={v4()} active={active} titles={title.children} />
                    </>
                );
            })}
        </ul>
    );
};

export default React.memo(TableOfContent);
