import axios from "axios";
import { takeLatest, put, all, call, } from "redux-saga/effects";
import { MapActionTypes } from "./map.types";
import {
    updateCurrentTime,
    updatePostcodeData,
    updateSelected,
    setLoading
} from "./map.actions";

export function* fetchMapDataAsync() {
    try {

        const one = axios.get(`https://worldtimeapi.org/api/timezone/Australia/Sydney`)
        const two = axios.get(`https://worldtimeapi.org/api/timezone/Australia/Brisbane`)
        const three = axios.get(`https://worldtimeapi.org/api/timezone/Australia/Melbourne`)
        const four = axios.get(`https://worldtimeapi.org/api/timezone/Australia/Adelaide`)
        const five = axios.get(`https://worldtimeapi.org/api/timezone/Australia/Darwin`)
        const six = axios.get(`https://worldtimeapi.org/api/timezone/Australia/Perth`)
        const seven = axios.get(`https://worldtimeapi.org/api/timezone/Australia/Hobart`)
        
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

    } catch(error) {
        console.log("ERROR", error)

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