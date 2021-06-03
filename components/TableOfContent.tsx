import React, { Dispatch, SetStateAction } from 'react';
import { TableContentModel } from '@models/TableOfConent.model';
import TableOfContentListItem from '@components/TableOfContentListItem';
import { v4 } from 'uuid';

const TableOfContent = ({
    titles = [],
    active,
    setActive
}: {
    titles: TableContentModel[];
    active: string;
    setActive: Dispatch<SetStateAction<null | string>>;
}): JSX.Element => {
    if (!titles.length) {
        return null;
    }
    return (
        <ul className="list-none pl-3">
            {titles.map((title) => {
                return (
                    <li key={v4()} className="break-words pb-1">
                        <TableOfContentListItem
                            active={active}
                            setActive={setActive}
                            title={title}
                        />
                        <TableOfContent
                            active={active}
                            setActive={setActive}
                            titles={title.children}
                        />
                    </li>
                );
            })}
        </ul>
    );
};

export default React.memo(TableOfContent);
