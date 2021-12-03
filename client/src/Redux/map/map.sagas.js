import axios from "axios";
import { takeLatest, put, all, call } from "redux-saga/effects";
import { MapActionTypes } from "./map.types";
import {
    updateCurrentTime,
    updatePostcodeData,
    updateConvertedTimes,
    updateSelected,
    setLoading,
} from "./map.actions";

let firstLoad = true;

export function* fetchMapDataAsync() {
    try {
        const fetchCurrentTime = yield axios.get("/map");
        const currentTime = fetchCurrentTime.data;
        yield put(updateCurrentTime(currentTime));

        if (firstLoad) {
            yield put(setLoading(false));
            firstLoad = false;
        }
    } catch (error) {
        console.log("ERROR", error);
        if (firstLoad) {
            yield put(setLoading(false));
            firstLoad = false;
        }
    }
}

export function* fetchPostcodeDataAsync({ payload }) {
    try {
        yield put(setLoading(true));
        const fetchPostcodeData = yield axios.get(`/postcode/${payload}`);
        const postcodeData = fetchPostcodeData.data;
        yield put(updatePostcodeData(postcodeData));
        yield put(updateSelected(postcodeData[0].state.abbreviation));
        yield put(setLoading(false));
    } catch (error) {
        yield put(updateSelected(""));
        yield put(setLoading(false));
        console.log("ERROR", error);
    }
}

export function* getConvertedTimesAsync({ payload }) {
    try {
        yield put(setLoading(true));
        const { location, time } = payload;
        const response = yield axios.get("/convert", {
            params: { location, time },
        });

        yield put(updateConvertedTimes(response.data));
        yield put(setLoading(false));
    } catch (error) {
        yield put(setLoading(false));
    }
}

export function* onFetchMapDataStart() {
    yield takeLatest(MapActionTypes.FETCH_MAP_DATA_START, fetchMapDataAsync);
}

export function* onFetchPostcodeData() {
    yield takeLatest(
        MapActionTypes.FETCH_POSTCODE_DATA,
        fetchPostcodeDataAsync
    );
}

export function* onGetConvertedTimes() {
    yield takeLatest(
        MapActionTypes.GET_CONVERTED_TIMES,
        getConvertedTimesAsync
    );
}

//getConvertedTimes
export function* mapSagas() {
    yield all([
        call(onFetchMapDataStart),
        call(onFetchPostcodeData),
        call(onGetConvertedTimes),
    ]);
}
