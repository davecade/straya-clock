import React, { useState, useEffect } from 'react'
import './Clock.scss'

//-- API's
//-- http://api.jsacreative.com.au/v1/suburbs?postcode=2155
//-- http://worldtimeapi.org/

const Clock = ({ className, city }) => {

    const [ display, setDisplay ] = useState(null)

    // useEffect(() => {
  
    //   return (async () => {
    //       const timer = setInterval(async () => {
    //         try {
    //             const fetchData = await fetch(`http://worldtimeapi.org/api/timezone/Australia/${city}`)
    //             // const fetchPostcode = await fetch('http://api.jsacreative.com.au/v1/suburbs?postcode=2155')
    //             // const postcode = await fetchPostcode.json()
    //             //console.log(postcode)
    //             const data = await fetchData.json()
    //             //console.log(data)
    //             const time = data.datetime.slice(11, 16)
    //             //console.log("time", time)
    //             setDisplay(time)
    //         } catch(error) {
    //             console.log("ERROR", error)
    //         }
              
    //       }, 500);

      
    //   })()
    // }, [])

    return (
        <div className={className}>
            <h4>{display}</h4>
        </div>
    )
}

export default Clock
