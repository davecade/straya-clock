import React from 'react'
import { connect } from 'react-redux'
import './Clock.scss'
import { updateSelected, updatePostcodeData } from '../../Redux/map/map.actions'
import { nonMilitary } from '../../JS Utils/JS-Utilities'


const Clock = ({ className, currentTime, updateSelected, updatePostcodeData }) => {

    const handleClick = () => {
        updateSelected(className)
        updatePostcodeData([])
    }

    return (
        <div className={`state ${className}`} onClick={handleClick}>
            <h4 className="state-name">{className}</h4>
            <p style={{fontSize: '1.5rem'}}>{currentTime[className]}</p>
            <p style={{fontSize: '1.5rem'}}>{currentTime[className] ? nonMilitary(currentTime[className]) : currentTime[className]}</p>
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
