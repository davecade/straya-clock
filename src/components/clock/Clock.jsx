import React from 'react'
import { connect } from 'react-redux'
import './Clock.scss'

//-- API's
//-- http://api.jsacreative.com.au/v1/suburbs?postcode=2155
//-- http://worldtimeapi.org/


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


const Clock = ({ className, currentTime }) => {

    return (
        <div className={`state ${className}`}>
            <h4 className="state-name">{className}</h4>
            <p style={{fontSize: '1.5rem'}}>{currentTime[className]}</p>
            <p style={{fontSize: '1.5rem'}}>{currentTime[className] ? nonMilitary(currentTime[className]) : currentTime[className]}</p>
        </div>
    )
}

const mapStateToProps = state => ({
    currentTime: state.map.currentTime
})

export default connect(mapStateToProps)(Clock)
