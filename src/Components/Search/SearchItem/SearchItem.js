import React from 'react'

import classes from "./SearchItem.module.css"

import { renderPlatforms } from "../../../helpers/renderPlatforms"

import { MEDIUM_IMAGE_URL, IMAGE_URL } from "../../../constants/urlAPI"
import NO_IMAGE from "../../../assets/img/1200px-No-Image-Placeholder.svg.png"

export default function SearchItem({ resultSearch }) {

    let imgResult
    if (resultSearch.background_image) {
        imgResult = <div className={classes['search-result__image']}>
            <img src={MEDIUM_IMAGE_URL + resultSearch.background_image.slice(IMAGE_URL.length)} alt={resultSearch.slug} />
        </div>
    }

    if (resultSearch.background_image === null) {
        imgResult = <div className={classes['search-result__image']}>
            <img src={NO_IMAGE} alt="notImage" />
        </div>
    }


    if (resultSearch.background_image === undefined) {
        imgResult = <div className={classes['search-result__border']}>
            <span></span>
        </div>
    }

    let platforms
    if (resultSearch.parent_platforms) {
        platforms = <div className={classes['search-result__platforms']}>
            {renderPlatforms(resultSearch)}
        </div>
    }

    const renderPositions = () => {
        return resultSearch.positions.map((position, i) => {
            return <span key={position.id}>{position.name[0].toUpperCase() + position.name.slice(1) + `${resultSearch.positions.length - 1 === i ? "" : ", "}`}</span>
        })
    }

    let positions
    if (Array.isArray(resultSearch.positions) && resultSearch.positions.length > 0) {
        positions = <div className={classes['search-result__positions']}>{renderPositions()}</div>
    }



    return (
        <li className={classes['search-result__item']}>
            <a href className={classes['search-result__link']}>
                {imgResult}
                <div className={classes['search-result__content']}>
                    {platforms}
                    <p className={classes['search-result__name']}>{resultSearch.name}</p>
                    {positions}
                </div>
            </a>
        </li>
    )
}
