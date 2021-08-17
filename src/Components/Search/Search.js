import React, { useCallback, useEffect, useState } from "react";

import { API_URL, PUBLIC_API_KEY } from "../../constants/urlAPI"

import classes from "./Search.module.css";

import SearchItem from "./SearchItem/SearchItem";
import Spinner from "../UI/Spinner";

export default function Search() {
    const [valueSearch, setvalueSearch] = useState("")
    const [listGameSearch, setListGameSearch] = useState(null)
    const [listCreatorsSearch, setListCreatorsSearch] = useState(null)
    const [isLoadingSearch, setIsLoadingSearch] = useState(false)
    const [errorSearch, setErrorSearch] = useState(null)

    const fetchSearch = useCallback(
        (searchValueParam) => {
            setIsLoadingSearch(true)
            setErrorSearch(null)

            Promise.all([fetch(API_URL + `/games?search=${searchValueParam}&key=${PUBLIC_API_KEY}`),
            fetch(API_URL + `/creators?search=${searchValueParam}&key=${PUBLIC_API_KEY}`)])
                .then(async ([resListGameSearch, resListCreatosSearch]) => {
                    const responseListGameSearch = await resListGameSearch.json()
                    const responseListCreatorsSearch = await resListCreatosSearch.json()
                    setListGameSearch(responseListGameSearch.results)
                    setListCreatorsSearch(responseListCreatorsSearch.results)
                    setIsLoadingSearch(false)
                })
                .catch(err => {
                    setErrorSearch(err.message || 'Something went wrong!')
                    setIsLoadingSearch(false)
                })
        }, []
    )

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (valueSearch) fetchSearch(valueSearch)
        }, 1000)

        return () => {
            clearTimeout(timeout)
        }
    }, [fetchSearch, valueSearch])

    const handleOnChange = (e) => {
        setvalueSearch(e.target.value)
        if(!valueSearch){
            setListGameSearch(null)
            setListCreatorsSearch(null)
        }
    }

    const renderListGameSearch = () => {
        return (
            <>
                <p className={classes['search-result__title']}>Games</p>
                <ul className={classes['search-result__list']}>
                    {listGameSearch?.slice(0, 7)?.map(gameSearch => {
                        return <SearchItem key={gameSearch.name} resultSearch={gameSearch} />
                    })}
                </ul>
            </>
        )
    }

    const renderListCreatorsSearch = () => {
        return (
            <>
                <p className={classes['search-result__title']}>Creators</p>
                <ul className={classes['search-result__list']}>
                    {listCreatorsSearch?.slice(0, 2)?.map(creatorsSearch => {
                        return <SearchItem key={creatorsSearch.name} resultSearch={creatorsSearch} />
                    })}
                </ul>
            </>
        )
    }

    let resultSearch
    if (isLoadingSearch) {
        resultSearch = <Spinner />
    }
    if (!isLoadingSearch) {
        if (valueSearch && errorSearch) {
            resultSearch = <p>{errorSearch}</p>
        }

        if (valueSearch && listGameSearch?.length > 0) {
            resultSearch = <>{renderListGameSearch()}</>
        }

        if (valueSearch && listCreatorsSearch?.length > 0) {
            resultSearch = <>{renderListCreatorsSearch()}</>
        }

        if ((valueSearch && listGameSearch?.length > 0) && (valueSearch && listCreatorsSearch?.length > 0)) {
            resultSearch = <> {renderListGameSearch()}
                {renderListCreatorsSearch()}</>
        }

        if (valueSearch && listGameSearch?.length === 0 && listCreatorsSearch?.length === 0) {
            resultSearch = <p>No Found Search</p>
        }
    }

    let resultSearchHTML = <div className={classes['search-result']}>{resultSearch}</div>

    return (
        <div className={classes.search}>
            <div className={classes.search__input}>
                <button>
                    <i className="fas fa-search"></i>
                </button>
                <input
                    autoComplete="off"
                    type="text"
                    placeholder="Search game titles"
                    value={valueSearch}
                    onChange={handleOnChange}
                />
            </div>
            {resultSearchHTML}
        </div>
    );
}
