import { takeLatest, put, all, call, } from "redux-saga/effects";
import { MapActionTypes } from "./map.types";

export function* fetchMapDataAsync() {
    try {

        
    } catch(error) {
        
    }
}

export function* onFetchMapDataStart() {
    yield takeLatest(MapActionTypes.FETCH_MAP_DATA_START, fetchMapDataAsync)
}

export function* ticketSagas() {
    yield all([
        // call(onFetchTicketDataStart),
        // call(onAddNewTicket),
        // call(onUpdateTicket)
    ])
}