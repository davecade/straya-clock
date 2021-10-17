import { MapActionTypes } from './map.types'

const INITIAL_STATE = {
    currentTime: {},
    loading: false,
    error: null
}

const mapReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case MapActionTypes.UPDATE_CURRENT_TIME:
            return {
                ...state,
                currentTime: action.payload
            }

        default:
            return {
                ...state
            }
    }
}

export default mapReducer;