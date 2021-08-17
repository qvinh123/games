import React from 'react'

import classes from "./ButtonFilter.module.css"

export default function ButtonFilter({ children, name, valueCurrent, onMouseleave, isMouseEnter }) {
    return (
        <div onMouseLeave={onMouseleave} onMouseEnter={isMouseEnter} className={`${classes['page__content-dropdown']} dropdown`}>
            <button className="dropdown-toggle" type="button" data-toggle="dropdown">
                {name}
                <span>{valueCurrent}</span>
            </button>
            {children}
        </div>
    )
}
