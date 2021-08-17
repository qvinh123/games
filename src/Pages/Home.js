import React from 'react'
import { API_URL, PUBLIC_API_KEY } from "../constants/urlAPI"

import Game from '../Components/Game/Game';
import GameItem from '../Components/GameItem/GameItem';

export default function Home({item}) {
 
    return (
        <Game title="All Games" url={`${API_URL}/games?key=${PUBLIC_API_KEY}`}>
            <GameItem item={item}/>
        </Game>
    )
}
