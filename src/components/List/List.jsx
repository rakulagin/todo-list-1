import React from "react";
import classNames from "classnames";
import Badge from "../Badge/Badge";

import removeSvg from '../../assets/img/remove.svg'

import './List.scss'


const List = ({ items, isRemovable, click, onRemove }) => {

    const removeList = (item) => {
        if (window.confirm('Подтвердите удаление')) {
            onRemove(item)
        }
    }

    return (
        <ul onClick={click}
            className="list">
            {items.map((item, index) => (
                <li key={index} className={classNames(item.className, {'active' : item.active})}>
                    <i>
                        {item.icon? (
                            item.icon
                        ) : (
                            <Badge color={item.color} />
                        )}
                    </i>
                    <span>{item.name}</span>
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