import React from 'react'
import { NavLink, useParams } from 'react-router-dom'

import classes from "./FilterItem.module.css"

export default function FilterItem({ item, onMouseEnter, typeFilter, isItemChild, onClickEmptyArr }) {

    const formatName = (name) => {
        return name.toLowerCase().split(" ").join("-")
    }

    return (
        <NavLink
            exact
            activeClassName={classes.active}
            to={{
                pathname: `/games/${formatName(item.name)}`,
                state: { id: item.id, name: item.name, slug: item.slug, typeFilter: typeFilter, isItemChild: isItemChild }
            }}
            onClick={() => {
                onClickEmptyArr()
            }}
            onMouseEnter={onMouseEnter ? () => onMouseEnter(item.name) : () => { }}
            className={`${classes['page__content-dropdown-item']} dropdown-item`}
            href
        >
            {item.name}
        </NavLink>
    )
}
