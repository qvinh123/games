import React from 'react'
import Search from '../Search/Search'

import classes from "./Header.module.css"

export default function Header() {
    return (
        <header className={classes.header}>
            <nav className={classes.nav}>
                <ul className={classes.nav__list}>
                    <li className={classes.nav__item}>
                        <a className={`${classes.nav__link} ${classes['nav__link--active']}`} href>Home</a>
                    </li>
                    <li className={classes.nav__item}>
                        <a className={classes.nav__link} href>Party</a>
                    </li>
                    <li className={classes.nav__item}>
                        <a className={classes.nav__link} href>Rewind</a>
                    </li>
                    <li className={classes.nav__item}>
                        <a className={classes.nav__link} href>News</a>
                    </li>
                    <li className={classes.nav__item}>
                        <a className={classes.nav__link} href>Settings</a>
                    </li>
                </ul>
            </nav>

            <div className={classes.searchAndInfo}>
                <Search />
                <div className={classes.header__user}>
                    <div className={classes.header__logo}>
                        <img src="https://kenh14cdn.com/thumb_w/660/2020/7/17/brvn-15950048783381206275371.jpg" alt="logo_user" />
                    </div>
                    <div className={classes.header__name}>
                        <span>
                            Name
                        </span>
                    </div>
                </div>
            </div>
        </header>
    )
}
