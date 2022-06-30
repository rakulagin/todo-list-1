import React, { useState, useEffect } from "react";
import axios from 'axios'

import List from "../List/List";
import Badge from "../Badge/Badge";

import closeSVG from '../../assets/img/close.svg'

import './AddList.scss'

const AddList = ({ colors, onAdd }) => {
    const [visiblePopup, setVisiblePopup] = useState(false)
    const [selectedColor, selectColor] = useState(1)
    const [inputValue, setInputValue] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if(Array.isArray(colors)) {
            selectColor(colors[0].id)
        }
    }, [colors])

    const addNewList = () => {
        if (!inputValue) {
            alert('ВВедите название списка')
            return
        }
        setIsLoading(true)
        axios.post('http://localhost:3001/lists', {name: inputValue, colorId: selectedColor})
            .then(({ data }) => {
                const color = colors.filter(color => color.id === selectedColor)[0].name
                const listObj = {...data, color: { name: color} }
                onAdd(listObj)
                onClose()
            })
            .catch( () => {
                alert('ошибка при добавлении списка')
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const onClose = () => {
        setVisiblePopup(false)
        setInputValue('')
        selectColor(colors[0].id)
    }

    return  (
        <div className="add-list">
            <List
                click={() => setVisiblePopup((!visiblePopup))}
                items={[
                {
                    className: "list__add-button",
                    //плюсик
                    icon: (<svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 1V15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M1 8H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>),
                    name: 'Добавить список',
                }
            ]}
            />
            {visiblePopup && (
                <div className='add-list__popup'>
                    <img
                        onClick={onClose}
                        src={closeSVG}
                        alt="close button"
                        className="add-list__popup-close-btn"
                    />
                    <input
                        value={inputValue}
                        onChange={e => {setInputValue(e.target.value)}}
                        className="field"
                        type="text"
                        placeholder="Название списка"
                    />
                    <div className="add-list__popup-colors">
                        {
                            colors.map(color => (
                                <Badge onClick={() => selectColor(color.id)}
                                       key={color.id}
                                       color={color.name}
                                       className={selectedColor === color.id && 'active'}
                                />
                            ))
                        }
                    </div>
                    <button
                        onClick={() => {
                            addNewList()
                        }}
                        className="button"
                    >
                        {isLoading ? 'Добавление...' : 'Добавить'}
                    </button>
                </div>
                )}
        </div>
    )
}

export default AddList