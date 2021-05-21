import React from 'react';
import { TableContentModel } from '@models/TableOfConent.model';
import TableOfContentListItem from '@components/TableOfContentListItem';
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
                    <div key={v4()}>
                        <TableOfContentListItem active={active} title={title} />
                        <TableOfContent active={active} titles={title.children} />
                    </div>
                );
            })}
        </ul>
    );
};

export default React.memo(TableOfContent);
