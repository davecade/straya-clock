import axios from "axios";
import { takeLatest, put, all, call, } from "redux-saga/effects";
import { MapActionTypes } from "./map.types";
import {
    updateCurrentTime,
    updatePostcodeData,
    updateSelected,
    setLoading
} from "./map.actions";

let firstLoad = true

export function* fetchMapDataAsync() {
    try {

        const requestOne = axios.get(`https://worldtimeapi.org/api/timezone/Australia/Sydney`)
        const requestTwo = axios.get(`https://worldtimeapi.org/api/timezone/Australia/Brisbane`)
        const requestThree = axios.get(`https://worldtimeapi.org/api/timezone/Australia/Melbourne`)
        const requestFour = axios.get(`https://worldtimeapi.org/api/timezone/Australia/Adelaide`)
        const requestFive = axios.get(`https://worldtimeapi.org/api/timezone/Australia/Darwin`)
        const requestSix = axios.get(`https://worldtimeapi.org/api/timezone/Australia/Perth`)
        const requestSeven = axios.get(`https://worldtimeapi.org/api/timezone/Australia/Hobart`)
        
        const mapData = yield axios.all([
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
        yield put(updateCurrentTime(currentTime))

        if(firstLoad) {
            yield put(setLoading(false))
            firstLoad = false
        }

    } catch(error) {
        console.log("ERROR", error)
        if(firstLoad) {
            yield put(setLoading(false))
            firstLoad = false
        }
    }
}

export function* fetchPostcodeDataAsync({payload}) {
    try {
        yield put(setLoading(true))
        const postcodeData = yield axios.get(`https://api.jsacreative.com.au/v1/suburbs?postcode=${payload}`)
        yield put(updatePostcodeData(postcodeData.data))
        yield put(updateSelected(postcodeData.data[0].state.abbreviation))
        yield put(setLoading(false))

    } catch(error) {
        yield put(updateSelected(""))
        yield put(setLoading(false))
        console.log("ERROR", error)

    }
}

export function* onFetchMapDataStart() {
    yield takeLatest(MapActionTypes.FETCH_MAP_DATA_START, fetchMapDataAsync)
}

export function* onFetchPostcodeData() {
    yield takeLatest(MapActionTypes.FETCH_POSTCODE_DATA, fetchPostcodeDataAsync)
}

export function* mapSagas() {
    yield all([
        call(onFetchMapDataStart),
        call(onFetchPostcodeData)
    ])
}