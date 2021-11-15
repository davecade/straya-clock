const express = require('express')
const cors = require('cors')
const axios = require('axios')
const path = require('path')

if(process.env.NODE_ENV !== 'production') require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000;

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}));

app.get('/map', async (req, res) => {
    const requestOne = axios.get(`https://worldtimeapi.org/api/timezone/Australia/Sydney`)
    const requestTwo = axios.get(`https://worldtimeapi.org/api/timezone/Australia/Brisbane`)
    const requestThree = axios.get(`https://worldtimeapi.org/api/timezone/Australia/Melbourne`)
    const requestFour = axios.get(`https://worldtimeapi.org/api/timezone/Australia/Adelaide`)
    const requestFive = axios.get(`https://worldtimeapi.org/api/timezone/Australia/Darwin`)
    const requestSix = axios.get(`https://worldtimeapi.org/api/timezone/Australia/Perth`)
    const requestSeven = axios.get(`https://worldtimeapi.org/api/timezone/Australia/Hobart`)
    
    const mapData = await axios.all([
        requestOne,
        requestTwo,
        requestThree,
        requestFour,
        requestFive,
        requestSix,
        requestSeven
    ])

    const currentTime = {
        NSW: mapData[0].data.datetime.slice(11, 19),
        QLD: mapData[1].data.datetime.slice(11, 19),
        VIC: mapData[2].data.datetime.slice(11, 19),
        SA: mapData[3].data.datetime.slice(11, 19),
        NT: mapData[4].data.datetime.slice(11, 19),
        WA: mapData[5].data.datetime.slice(11, 19),
        TAS: mapData[6].data.datetime.slice(11, 19),
    }
    res.send(currentTime)
})

app.get('/postcode/:code', async (req, res) => {
    const fetchPostcodeData = await axios.get(`https://api.jsacreative.com.au/v1/suburbs?postcode=${req.params.code}`)
    res.send(fetchPostcodeData.data)
})



if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')))

    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
    })
}

//-- Runs server
app.listen(port, error => {
    if(error) throw error;
    console.log(`Server runnning on port ${port}`)
})