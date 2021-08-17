import React from 'react'

import Header from './Header'
import Sidebar from "./Sidebar"

import classes from "./Layout.module.css"

export default function Layout({ children }) {
    return (
        <div className="container-fluid">
            <div className="row" style={{height:"100vh"}}>
                <div className={`col-2 ${classes.wrapper__sidebar}`}>
                        <Sidebar />
                </div>

                <div className={`col-10 ${classes.wrapper__main}`}>
                    <Header />
                    <main>
                        {children}
                    </main>
                </div>
            </div>
        </div>
    )
}
