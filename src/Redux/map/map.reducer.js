import { MapActionTypes } from './map.types'

const INITIAL_STATE = {
    currentTime: {},
    selected: "",
    postcodeData: [],
    error: null
}

const mapReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case MapActionTypes.UPDATE_CURRENT_TIME:
            return {
                ...state,
                currentTime: action.payload
            }

        case MapActionTypes.UPDATE_SELECTED:
            return {
                ...state,
                selected: action.payload
            }
        case MapActionTypes.UPDATE_POSTCODE_DATA:
            return {
                ...state,
                postcodeData: action.payload
            }

        default:
            return {
                ...state
            }
    }
}

export default mapReducer;