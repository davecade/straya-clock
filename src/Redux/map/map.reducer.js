import { MapActionTypes } from './map.types'

const INITIAL_STATE = {
    currentTime: {default: 'default'},
    selected: null,
    postcodeData: [],
    loading: true,
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

        case MapActionTypes.SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }

        default:
            return {
                ...state
            }
    }
}

export default mapReducer;