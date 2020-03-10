import {createStore, combineReducers, applyMiddleware} from 'redux';
import reducer from './reducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const allReducer = combineReducers({
    reducer
})

const store = createStore(
    allReducer, applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga)

export default store