import React from "react"
import ReactDOM from "react-dom"

import classes from "./BackDrop.module.css"

const portalElement = document.getElementById('backDrop');

const BackDrop = ({ leave }) => {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(<div className={classes.backdrop} />, portalElement)}
        </React.Fragment>
    )
}
export default BackDrop