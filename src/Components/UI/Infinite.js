import React from 'react'

import InfiniteScroll from 'react-infinite-scroll-component';

import Spinner from './Spinner';

export default function Infinite(props) {
    let loader
    if (props.errorScroll) {
         loader = <p>Lỗi</p>
    }

    if (!props.errorScroll || props.isLoadingScroll) {
         loader = <Spinner />
    }

    if (!props.isLoadingScroll) {
        loader = ""
    }

    return (
        <InfiniteScroll
            dataLength={props.listCard.length}
            next={props.fetchScrollGames}
            style={{ overflowX: "hidden" }}
            hasMore={true}
            loader={loader}
        >
            <div className="container-fluid">
                <div className="row">
                    {props.children}
                </div>
            </div>
        </InfiniteScroll>
    )
}
