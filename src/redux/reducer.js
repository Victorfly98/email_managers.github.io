import actions from './action'

const initialState = {
    bouncesEmail: [],
    complaintEmail: [],
    unsubEmail: [],
    deliver: [],
    failed: [],
    opened: [],
    clicked: []
}

const reducer = (state = initialState, action) => {
    console.log('action: ',action)
    switch (action.type) {
        case actions.type.SEND_MAIL:
            return {
                ...state,
            }
        case actions.type.DELETE_MONITOR_EMAIL:
            return {
                ...state,
            }
        case actions.type.UPDATE_STATE:
            return {
                ...state,
                ...action.payload.state
            }
        default:
            return state
    }
}
export default reducer