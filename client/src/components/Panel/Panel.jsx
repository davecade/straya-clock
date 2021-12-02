import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import './Panel.scss'
import { fetchPostcodeData, updateSelected }  from '../../Redux/map/map.actions'
import { nonMilitary } from '../../JS Utils/JS-Utilities'
import axios from "axios";


const stateKey = {
    NSW: "New South Wales",
    QLD: "Queensland",
    VIC: "Victoria",
    SA: "South Australia",
    NT: "Northern Territory",
    WA: "Western Australia",
    TAS: "Tasmania"
}

//-- new array
const array =["NSW", "QLD", "VIC", "SA", "NT", "WA", "TAS"]

const Panel = ({ currentTime, selected, fetchPostcodeData, postcodeData, loading }) => {
    const [ panelTime, setPanelTime ] = useState({time: '', format: ''})
    const [ searchFieldVal, setSearchfieldVal ] = useState(null)
    const [ convertFromState, setConvertFromState ] = useState("NSW")
    const [ convertFromTime, setConvertFromTime ] = useState("")
    const [ convertedTime, setConvertedTime ] = useState([])

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

    const handleConvertFromStateChange = (e) => {
        setConvertFromState(e.target.value)
    }

    const handleConvertFromTimeChange = (e) => {
        setConvertFromTime(e.target.value)
    }

    const handleConvertedTimeChange = async (e) => {
        const response = await axios.get('/convert', {
            params: { 
                convertFromState,
                convertFromTime
            }
        })
        
        setConvertedTime(response.data)
    }

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
                <div className="suburbs">
                    {
                        postcodeData.map( (location, index) => {
                            return <div key={index}>{`${location.name}`}</div>
                        })
                    }
                </div>
            </div>
            <div className="timezone__converter">
                <div className="timezone__converter__container_from">
                    <div className="typeSelector">
                        <div className="dropdown">
                            <select className="dropbtn" value={convertFromState} onChange={handleConvertFromStateChange} >
                                {
                                    array.map((state, index) => {
                                        return <option key={index} value={state}>{state}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <input type="time" className="input__time" value={convertFromTime} onChange={handleConvertFromTimeChange} />
                </div>
                <button className="submit__button" onClick={handleConvertedTimeChange}>SUBMIT</button>
                {
                    convertedTime.map( converted => {
                        return <p className="converted__time"><span className="state-list">{converted.state}</span>{`: ${converted.time}`}</p>
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
