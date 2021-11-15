import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import './Clock.scss'
import { updateSelected, updatePostcodeData } from '../../Redux/map/map.actions'
import { nonMilitary } from '../../JS Utils/JS-Utilities'


const Clock = ({ className, currentTime, updateSelected, updatePostcodeData }) => {
    const [ clockTime, setClockTime ] =  useState(null)

    const handleClick = () => {
        updateSelected(className)
        updatePostcodeData([])
    }

    useEffect(() => {
        if(currentTime[className] && className) {
            setClockTime(currentTime[className].slice(0,5))
        }
    }, [currentTime, className])

    return (
        <div className={`state ${className}`} onClick={handleClick}>
            <h4 className="state-name">{className}</h4>
            <p style={{fontSize: '1.5rem'}}>{clockTime}</p>
            <p style={{fontSize: '1.5rem'}}>{clockTime ? nonMilitary(clockTime) : clockTime}</p>
        </div>
    )
}

const mapStateToProps = state => ({
    currentTime: state.map.currentTime
})

const mapDispatchToProps = dispatch => ({
    updateSelected: stateName => dispatch(updateSelected(stateName)),
    updatePostcodeData: postcode => dispatch(updatePostcodeData(postcode))
})

export default connect(mapStateToProps, mapDispatchToProps)(Clock)
