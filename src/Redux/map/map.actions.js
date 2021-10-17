import { MapActionTypes } from "./map.types";

export const fetchMapDataStart = () => ({
    type: MapActionTypes.FETCH_MAP_DATA_START
})

export const updateCurrentTime = (currentTime) => ({
    type: MapActionTypes.UPDATE_CURRENT_TIME,
    payload: currentTime
})