import React from 'react';
import classNames from 'classnames';

const DotNavHeader = (): JSX.Element => {
    return (
        <ul className="list-none p-0">
            <DotItemNav active={true} title="Home" />
            <DotItemNav title="Realease & LTS" />
            <DotItemNav title="Tutorials" />
            <DotItemNav title="Forums" />
            <DotItemNav title="Online Training" />
        </ul>
    );
};

const DotItemNav = ({
    title,
    active = false
}: {
    title: string;
    active?: boolean;
}): JSX.Element => {
    return (
        <li
            className={classNames('py-2', 'px-2', 'mr-5', 'font-bold', 'inline-block', {
                'text-purple': active,
                'border-b-2': active,
                'border-primary': active
            })}
        >
            <a href="#">{title}</a>
        </li>
    );
};

export default DotNavHeader;
