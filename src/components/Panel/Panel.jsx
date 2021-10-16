import React from 'react'
import './Panel.scss'

const Panel = () => {

    return (
        <div className="panel">
            <div className="search-container" >
                <input type="text" className="search-bar" placeholder="Search..."/>
            <i className="fas fa-search fa-search"></i>
        </div>
        </div>
    )
}

export default Panel
