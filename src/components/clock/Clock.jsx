import React, { useState, useEffect } from 'react'

//-- API's
//-- https://www.beliefmedia.com.au/australian-postal-codes
//-- http://worldtimeapi.org/

const Clock = () => {

    const [ display, setDisplay ] = useState(null)

    useEffect(() => {
  
      return (async () => {
        try {
            const fetchData = await fetch('http://worldtimeapi.org/api/timezone/Australia/Sydney')
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
