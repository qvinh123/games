import React from 'react'
import FilterItem from '../ButtonFilter/FilterItem/FilterItem'

import classes from "./DropdownMenu.module.css"

export default function DropdownMenu({ listMenu, itemMenu, onMouseEnter, isOnMouse, typeFilter, onClickEmptyArr }) {
    const renderListMenuChild = (item) => {
        return itemMenu === item.name && isOnMouse && item[`${typeFilter}`].length > 1 ?

            <div className={`${classes['page__content-dropdown-children']}`}>
                {item[`${typeFilter}`].map((item, i) => {
                    return <FilterItem
                        onClickEmptyArr={onClickEmptyArr}
                        typeFilter={typeFilter}
                        isItemChild={true}
                        item={item}
                        key={i}
                    />
                })}
            </div> :
            null
    }

    return (
        <div className={`${classes['page__content-dropdown-menu']} dropdown-menu`}>
            {listMenu.map((item, i) => {
                return <React.Fragment key={i}>
                    <FilterItem
                        key={i}
                        onClickEmptyArr={onClickEmptyArr}
                        typeFilter={typeFilter}
                        item={item}
                        onMouseEnter={onMouseEnter ? () => onMouseEnter(item.name) : () => { }}
                    />
                    {renderListMenuChild(item)}
                </React.Fragment>
            })}
        </div>
    )
}