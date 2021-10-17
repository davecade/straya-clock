import axios from "axios";
import { takeLatest, put, all, call, } from "redux-saga/effects";
import { MapActionTypes } from "./map.types";
import { updateCurrentTime } from "./map.actions";

export function* fetchMapDataAsync() {
    try {
        const one = axios.get(`http://worldtimeapi.org/api/timezone/Australia/Sydney`)
        const two = axios.get(`http://worldtimeapi.org/api/timezone/Australia/Brisbane`)
        const three = axios.get(`http://worldtimeapi.org/api/timezone/Australia/Melbourne`)
        const four = axios.get(`http://worldtimeapi.org/api/timezone/Australia/Adelaide`)
        const five = axios.get(`http://worldtimeapi.org/api/timezone/Australia/Darwin`)
        const six = axios.get(`http://worldtimeapi.org/api/timezone/Australia/Perth`)
        const seven = axios.get(`http://worldtimeapi.org/api/timezone/Australia/Hobart`)
        
        // const fetchPostcode = await fetch('http://api.jsacreative.com.au/v1/suburbs?postcode=2155')
        // const postcode = await fetchPostcode.json()
        //console.log(postcode)
        const mapData = yield axios.all([one, two, three, four, five, six, seven])

        const currentTime = {
            NSW: mapData[0].data.datetime.slice(11, 16),
            QLD: mapData[1].data.datetime.slice(11, 16),
            VIC: mapData[2].data.datetime.slice(11, 16),
            SA: mapData[3].data.datetime.slice(11, 16),
            NT: mapData[4].data.datetime.slice(11, 16),
            WA: mapData[5].data.datetime.slice(11, 16),
            TAS: mapData[6].data.datetime.slice(11, 16),
        }
        yield put(updateCurrentTime(currentTime))
        //const time = data.datetime.slice(11, 16)
        //console.log("time", time)
    } catch(error) {
        console.log("ERROR", error)
    }
}

export function* onFetchMapDataStart() {
    yield takeLatest(MapActionTypes.FETCH_MAP_DATA_START, fetchMapDataAsync)
}

export function* mapSagas() {
    yield all([
        call(onFetchMapDataStart),
    ])
}