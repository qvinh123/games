import React, { useEffect, useState } from 'react'

import ButtonFilter from '../ButtonFilter/ButtonFilter';
import Infinite from '../UI/Infinite';
import Spinner from '../UI/Spinner';
import DropdownMenu from '../DropdownMenu/DropdownMenu';

import { listDatesParent } from '../../assets/dataDates';
import { listOrderBy } from '../../assets/dataOrderBy';

import { API_URL, PUBLIC_API_KEY } from "../../constants/urlAPI"

import classes from "./Game.module.css"

import useHttp from '../../hooks/use-http'
import useFetchList from '../../hooks/use-fetchList';
import useFetchScroll from '../../hooks/use-fetchScroll';
import useEEnterLeave from '../../hooks/use-eEnterLeave';
import { useParams } from 'react-router-dom';

export default function Game({ id, url, slug, title, namePlatform, nameDate, children }) {
    const { param } = useParams()

    const { list: listCard, pageNextList: pageNextListCard, getListPage: getListPageCard, emptyArr: emptyArrListCard } = useFetchList()

    const { list: listPlatforms, getList: getListPlatforms } = useFetchList()

    const { isLoading: isLoadingScrollGames, error: errorScrollGames, fetchScroll: fetchScrollGames } = useFetchScroll()

    const {
        nameHover,
        isOnMouse,
        onMouseLeaveHandler,
        onMouseEnterHandler,
        isMouseEnterHandler } = useEEnterLeave()


    const { isLoading: isLoadingFirstFetch, error: errorFirstFetch, sendRequest: fetchListGame } = useHttp()
    const { sendRequest: fetchListPlatforms } = useHttp()

    const renderListGame = listCard?.map((item, i) => {
        return <div key={i} className="col-3 my-3">
            {React.cloneElement(children, { item: item })}
        </div>
    })

    useEffect(() => {
        emptyArrListCard()
    }, [param])

    useEffect(() => {
        fetchListPlatforms({ url: `${API_URL}/platforms/lists/parents?key=${PUBLIC_API_KEY}` }, getListPlatforms)
        fetchListGame({ url: url }, getListPageCard)
    }, [id, slug])

    let listHTML
    if (isLoadingFirstFetch && !errorFirstFetch) {
        listHTML = <Spinner />
    }

    if (errorFirstFetch && !isLoadingFirstFetch) {
        listHTML = <p>Lỗi</p>
    }

    if (!isLoadingFirstFetch && !errorFirstFetch) {
        listHTML =
            <Infinite isLoadingScroll={isLoadingScrollGames} errorScroll={errorScrollGames} listCard={listCard} fetchScrollGames={() => fetchScrollGames(pageNextListCard, getListPageCard)}>
                {renderListGame}
            </Infinite>
    }

    return (
        <div className={classes.page__content}>
            <div className={classes['page__content-header']}>
                <div className={`${classes['page__content-heading']}`}>
                    <h2>{title}</h2>
                </div>
                <div className={`${classes['page__content-filter']}`}>

                    <ButtonFilter
                        name="Order by: "
                        valueCurrent="Name">
                        <DropdownMenu
                            onClickHandler={emptyArrListCard}
                            listMenu={listOrderBy}
                        />
                    </ButtonFilter>

                    <ButtonFilter
                        onMouseleave={() => { onMouseLeaveHandler() }}
                        isMouseEnter={() => isMouseEnterHandler()}
                        valueCurrent={nameDate}
                        name="Release date: "
                    >
                        <DropdownMenu
                            onClickEmptyArr={emptyArrListCard}
                            listMenu={listDatesParent}
                            itemMenu={nameHover}
                            onMouseEnter={(nameHover) => onMouseEnterHandler(nameHover)}
                            isOnMouse={isOnMouse}
                            typeFilter="dates"
                        />
                    </ButtonFilter>

                    <ButtonFilter
                        onMouseleave={() => { onMouseLeaveHandler() }}
                        isMouseEnter={() => isMouseEnterHandler()}
                        valueCurrent={namePlatform || "Platforms: "}
                    >
                        <DropdownMenu
                            onClickEmptyArr={emptyArrListCard}
                            listMenu={listPlatforms}
                            itemMenu={nameHover}
                            onMouseEnter={(nameHover) => onMouseEnterHandler(nameHover)}
                            isOnMouse={isOnMouse}
                            typeFilter="platforms"
                        />
                    </ButtonFilter>
                </div>
            </div>
            {listHTML}
        </div>
    )
}
