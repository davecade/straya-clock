import { all, call } from 'redux-saga/effects'
import { mapSagas } from './map/map.sagas'

function* rootSaga() {
    yield all([
        call(mapSagas),
    ])
}

export default rootSaga;