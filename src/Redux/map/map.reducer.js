import { MapActionTypes } from './map.types'

const INITIAL_STATE = {
    currentTime: {},
    loading: false,
    error: null
}

const mapReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {

        default:
            return {
                ...state
            }
    }
}

export default mapReducer;