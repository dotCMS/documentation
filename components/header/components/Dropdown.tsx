import React, { useState } from 'react';
import classNames from 'classnames';

const Dropdown = (): JSX.Element => {
    const [hideDropList, setHideDropList] = useState(true);
    const [itemSelected, setItemSelected] = useState({
        id: '0',
        value: 'latest',
        option: 'Lastest'
    });
    const itemSelectedClasses = ['bg-purple-light', 'text-white', 'hover:bg-purple-light'];
    const items = [
        {
            id: '0',
            value: 'latest',
            option: 'Lastest'
        },
        {
            id: '1',
            value: 'V8.2.1',
            option: '8.2.1'
        }
    ];
    const selectItem = (item) => {
        setItemSelected(item);
        setHideDropList(true);
    };
    return (
        <div className="cursor-pointer relative">
            <div
                className="flex items-center content-center justify-between select-none bg-white rounded w-40 h-8 text-xs border border-secondary text-gray px-2"
                onClick={() => setHideDropList(!hideDropList)}
            >
                <span>
                    <span className="font-bold text-sm">Version: </span>
                    {itemSelected.option}
                </span>
                <i className="border border-gray border-t-0 border-r-1 border-b-1 border-l-0 p-1 inline-block transform rotate-45" />
            </div>
            <div
                className={classNames(
                    'bg-white text-xs absolute shadow w-full max-h-32 overflow-auto',
                    {
                        hidden: hideDropList
                    }
                )}
            >
                <ul className="list-none p-0">
                    {items.map((item) => (
                        <li
                            key={item.id}
                            className={classNames(
                                'p-2 hover:bg-purple hover:text-white',
                                item.id === itemSelected.id ? itemSelectedClasses : null
                            )}
                            onClick={() => selectItem(item)}
                        >
                            {item.value}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Dropdown;
