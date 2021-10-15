import React, { useState, useEffect } from 'react'
import './Clock.scss'

//-- API's
//-- http://api.jsacreative.com.au/v1/suburbs?postcode=2155
//-- http://worldtimeapi.org/

const stateKey = {
    'Sydney': 'NSW',
    'Melbourne': 'VIC',
    'Adelaide': 'SA',
    'Darwin': 'NT',
    'Brisbane': 'QLD',
    'Perth': 'WA',
    'Hobart': 'TAS'
}

const Clock = ({ className, city }) => {

    const [ display, setDisplay ] = useState(null)
    const [ stateName, setStateName ] = useState('')



    useEffect(() => {
  
      return (async () => {
          setInterval(async () => {
            try {
                const fetchData = await fetch(`http://worldtimeapi.org/api/timezone/Australia/${city}`)
                // const fetchPostcode = await fetch('http://api.jsacreative.com.au/v1/suburbs?postcode=2155')
                // const postcode = await fetchPostcode.json()
                //console.log(postcode)
                const data = await fetchData.json()
                console.log(data)
                const time = data.datetime.slice(11, 19)
                //console.log("time", time)
                setDisplay(time)
                setStateName(data.timezone)
            } catch(error) {
                console.log("ERROR", error)
            }
              
          }, 500);

      
      })()
    }, [city])

    return (
        <div className={className}>
            <h4>{stateKey[stateName.slice(10)]}</h4>
            <p>{display}</p>
        </div>
    )
}

export default Clock
