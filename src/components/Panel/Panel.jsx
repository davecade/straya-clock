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
    const [ panelTime, setPanelTime ] = useState(null)
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


    useEffect(() => {

        if(currentTime && selected) {
            setPanelTime(nonMilitary(currentTime[selected]))
        } else {
            setPanelTime("00:00")
        }

    }, [currentTime, selected])

    return (
        <div className="panel">
            <div className="search-container" >
                <input type="text" className="search-bar" onChange={handleOnChange} onKeyPress={handleEnter} placeholder="Search..."/>
                <i className="fas fa-search fa-search"></i>
            </div>
            <div className="clock">
                {
                    loading ?
                    <h1>Loading...</h1>
                    :
                    <h1>{panelTime}</h1>
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
