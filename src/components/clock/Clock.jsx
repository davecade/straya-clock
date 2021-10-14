import React, { useState, useEffect } from 'react'

//-- API's
//-- http://api.jsacreative.com.au/v1/suburbs?postcode=2155
//-- http://worldtimeapi.org/

const Clock = () => {

    const [ display, setDisplay ] = useState(null)

    useEffect(() => {
  
      return (async () => {
        try {
            const fetchData = await fetch('http://worldtimeapi.org/api/timezone/Australia/Sydney')
            const fetchPostcode = await fetch('http://api.jsacreative.com.au/v1/suburbs?postcode=2155')
            const postcode = await fetchPostcode.json()
            console.log(postcode)
            const data = await fetchData.json()
            const time = new Date(data.datetime)
            setDisplay(`${time.getHours()}:${time.getMinutes()}`)
        } catch(error) {
            console.log("ERROR", error)
        }
      
      })()
  
    }, [])

    return (
        <div className="WA">
            <h4>{display}</h4>
        </div>
    )
}

export default Clock
