import React from 'react'
import Game from '../Components/Game/Game'
import { API_URL, PUBLIC_API_KEY } from "../constants/urlAPI"
import { useLocation, useParams } from 'react-router-dom';
import GameItem from '../Components/GameItem/GameItem';

export default function AllGames({ game }) {
    const location = useLocation()
    const { name, slug, id, typeFilter, isItemChild } = location.state
    const { param1, param2 } = useParams()

    let nameUrl
    let nameDate
    let namePlatform
    let title

    if (param1) {
        if (typeFilter === "dates") {
            nameUrl = "dates=" + slug
            nameDate = name
            title = "Game of " + name
        } else if (typeFilter === "platforms") {
            namePlatform = name
            title = "Game for " + name
            if (!isItemChild) {
                nameUrl = "parent_platforms=" + id
            } else {
                nameUrl = "platforms=" + id
            }
        }
    }

    return (
        <Game title={title} namePlatform={namePlatform} nameDate={nameDate} slug={slug} url={`${API_URL}/games?key=${PUBLIC_API_KEY}${`&${nameUrl}`}`}>
            <GameItem game={game} />
        </Game>
    )
}
