import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import './Panel.scss'
import { fetchPostcodeData, updateSelected }  from '../../Redux/map/map.actions'
import { nonMilitary } from '../../JS Utils/JS-Utilities'


const stateKey = {
    NSW: "New South Wales",
    QLD: "Queensland",
    VIC: "Victoria",
    SA: "South Australia",
    NT: "Northern Territory",
    WA: "Western Australia",
    TAS: "Tasmania"
}

const Panel = ({ currentTime, selected, fetchPostcodeData, postcodeData, loading }) => {
    const [ panelTime, setPanelTime ] = useState({time: '', format: ''})
    const [ searchFieldVal, setSearchfieldVal ] = useState(null)

    const handleOnChange = event => {
        if(event.target.value) {
            setSearchfieldVal(event.target.value)
        } else {
            setSearchfieldVal(null)
        }
        
    }

    const handleEnter = event => {
        if (event.key === 'Enter') {
            if(searchFieldVal && searchFieldVal[0]==='0') {
                fetchPostcodeData(searchFieldVal.slice(1))
            } else {
                fetchPostcodeData(searchFieldVal)
            }
        }
    }

    const handleClick = () => {
        if(searchFieldVal[0]==='0') {
            fetchPostcodeData(searchFieldVal.slice(1))
        } else {
            fetchPostcodeData(searchFieldVal)
        }
    }

    const toggleTimeFormat = () => {
        if(panelTime.format==='12') {
            setPanelTime({
                time: currentTime[selected],
                format: "24"
            })
        } else {
            setPanelTime({
                time: nonMilitary(currentTime[selected]),
                format: "12"
            })
        }
    }


    useEffect(() => {

        if(currentTime && selected) {
            if(panelTime.format==='12') {
                setPanelTime({
                    time: nonMilitary(currentTime[selected]),
                    format: "12"
                })
            } else {
                setPanelTime({
                    time: currentTime[selected],
                    format: "24"
                })
            }

        } else {
            setPanelTime({
                time: "No Results",
                format: "12"
            })
        }

    }, [currentTime, selected, panelTime.format])

    return (
        <div className="panel">
            <div className="search-container" >
                <input type="text" className="search-bar" onChange={handleOnChange} onKeyPress={handleEnter} placeholder="Enter postcode..."/>
                <i className="fas fa-search fa-search" onClick={handleClick}></i>
            </div>
            <div onClick={toggleTimeFormat} className="clock">
                {
                    loading ?
                    <h1>Loading...</h1>
                    :
                    <h1>{panelTime.time}</h1>
                }
            </div>
            <div className="postcode-info">
                <div className="state-name">{stateKey[selected]}</div>
                {
                    postcodeData.map( location => {
                        return <div>{`${location.name}`}</div>
                    })
                }
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    currentTime: state.map.currentTime,
    selected: state.map.selected,
    postcodeData: state.map.postcodeData,
    loading: state.map.loading
})

const mapDispatchToProps = dispatch => ({
    fetchPostcodeData: postcode => dispatch(fetchPostcodeData(postcode)),
    updateSelected: stateName => dispatch(updateSelected(stateName))
})

export default connect(mapStateToProps, mapDispatchToProps)(Panel)
