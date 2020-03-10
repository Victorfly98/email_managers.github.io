import listen from './saga';

import { all } from 'redux-saga/effects'

export default function* rootSaga() {
    yield all([
        listen(),
    ])
}