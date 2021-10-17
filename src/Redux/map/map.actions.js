import { MapActionTypes } from "./map.types";

export const fetchMapDataStart = () => ({
    type: MapActionTypes.FETCH_MAP_DATA_START
})

export const updateCurrentTime = (currentTime) => ({
    type: MapActionTypes.UPDATE_CURRENT_TIME,
    payload: currentTime
})

export const updateSelected = stateName => ({
    type: MapActionTypes.UPDATE_SELECTED,
    payload: stateName
})

export const fetchPostcodeData = postcode => ({
    type: MapActionTypes.FETCH_POSTCODE_DATA,
    payload: postcode
})

export const updatePostcodeData = postcodeData => ({
    type: MapActionTypes.UPDATE_POSTCODE_DATA,
    payload: postcodeData
})

export const setLoading = status => ({
    type: MapActionTypes.SET_LOADING,
    payload: status
})