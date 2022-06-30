import React from "react";
import classNames from "classnames";
import axios from 'axios'

import Badge from "../Badge/Badge";

import removeSvg from '../../assets/img/remove.svg'

import './List.scss'


const List = ({ items, isRemovable, click, onRemove, onClickItem, activeItem }) => {

    const removeList = (item) => {
        if (window.confirm('Подтвердите удаление')) {
            axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
                onRemove(item.id)
            })
        }
    }

    return (
        <ul onClick={click}
            className="list">
            {items.map((item, index) => (
                <li
                    key={index}
                    className={classNames(item.className, {
                        active: item.active ? item.active : activeItem && activeItem.id === item.id
                    })}
                    onClick={ onClickItem ? () => onClickItem(item) : null}
                >
                    <i>
                        {item.icon? (
                            item.icon
                        ) : (
                            <Badge color={item.color.name} />
                        )}
                    </i>
                    <span className='list__title'>
                        {item.name}
                        {item.tasks && item.tasks.length > 0 && ` (${item.tasks.length})`}
                    </span>
                    {isRemovable && (
                        <img className="list__remove-icon"
                             src={removeSvg} alt="remove"
                             onClick={ () => {removeList(item)}}
                        />
                    )}
                </li>
            ))}
        </ul>
    )
}

export default List