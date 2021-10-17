import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import './Panel.scss'
import { fetchPostcodeData, updateSelected }  from '../../Redux/map/map.actions'


const nonMilitary = time => {
    let hour = Number(time.slice(0,2))

    if(hour > 12) {
        return `${hour-12}${time.slice(2)} PM`
    } else {
        if(hour > 0 && hour < 10) {
            return `${hour.toString()}${time.slice(2)} AM`
        } else if(hour === 0) {
            return `12${time.slice(2)} AM`
        } else {
            return `${time} PM`
        }
        
    }
}

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
        setSearchfieldVal(event.target.value)
    }

    const handleEnter = event => {
        if (event.key === 'Enter') {
            if(searchFieldVal[0]==='0') {
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
                time: "00:00",
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
