import React from 'react'

import classes from "./GameItem.module.css"

import { renderPlatforms } from "../../helpers/renderPlatforms"

import { MEDIUM_IMAGE_URL } from "../../constants/urlAPI"
import { IMAGE_URL } from "../../constants/urlAPI"

import HoverVideoPlayer from 'react-hover-video-player';

import Spinner from "../UI/Spinner"
import NOPHOTO from "../../assets/img/no-photo.png"

export default function GameItem({ item }) {

    const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(item?.released?.split("-").join(", "))
    const dateTimeFormat = new Intl.DateTimeFormat('en-US', optionsDate);

    const renderListGenres = () => {
        return (
            <ul>
                {item.genres?.map((genres, index) => {
                    return <li key={index}>
                        <span>{item.genres.length - 1 === index ? genres.name : genres.name + ","}</span>
                    </li>
                })}
            </ul>
        )
    }

    const renderImage = (game) => {
        return (
            game.background_image ?
                <HoverVideoPlayer
                    videoSrc={game?.clip?.clips['320'] || []}
                    pausedOverlay={
                        <img src={MEDIUM_IMAGE_URL + game.background_image?.slice(IMAGE_URL.length)}
                            alt={game.name} />
                    }
                    loadingOverlay={game?.clip?.clips['320'] ?
                        <div className="loading-overlay">
                            <Spinner />
                        </div> : null
                    }>
                </HoverVideoPlayer> : <img src={NOPHOTO}
                    alt={game.name} />
        )
    }


    return (
        <div className={classes.card}>
            <div className={`${classes.card__image} ${item?.clip?.clips['320'] ? `${classes['card__btn-play']}` : ""}`}>
                {renderImage(item)}
            </div>

            <div className={classes.card__content}>
                <div className={classes.card__platforms}>
                    {renderPlatforms(item)}
                </div>

                {item.metacritic ? <div className={classes.card__metacritic}>
                    <span>{item.metacritic}</span>
                </div> : null}

                <div className={classes.card__title}>
                    <h5>{item.name}</h5>
                </div>

                <div className={classes.card__genres}>
                    Genres: {renderListGenres()}
                </div>

                <div className={classes.card__release}>
                    Release date: <span>{item?.released ? dateTimeFormat?.format(date) : ""}</span>
                </div>
            </div>
        </div>
    )
}
