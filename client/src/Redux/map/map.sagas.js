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

        const fetchCurrentTime = yield axios.get('/map')
        const currentTime = fetchCurrentTime.data
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
        const fetchPostcodeData = yield axios.get(`/postcode/${payload}`)
        const postcodeData = fetchPostcodeData.data
        console.log("postcodeData", postcodeData)
        yield put(updatePostcodeData(postcodeData))
        yield put(updateSelected(postcodeData[0].state.abbreviation))
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