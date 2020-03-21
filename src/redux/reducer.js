import actions from './action'

const initialState = {
    bouncesEmail: [],
    complaintEmail: [],
    unsubEmail: [],
    deliver: [],
    failed: [],
    opened: [],
    clicked: [],
    isSending: false,
    isSended: false,
    isLoading: false
}

const reducer = (state = initialState, action) => {
    console.log('action: ',action)
    switch (action.type) {
        case actions.type.SEND_MAIL:
            return {
                ...state,
                isSending: true
            }
        case actions.type.DELETE_MONITOR_EMAIL:
            return {
                ...state,
            }
        case actions.type.GET_MONITOR_EMAIL: {
            return {
                ...state,
                isLoading: true
            }
        }
        case actions.type.GET_EVENT: {
            return {
                ...state,
                isLoading: true
            }
        }
        case actions.type.UPDATE_STATE:
            return {
                ...state,
                ...action.payload.state,
                isLoading: false,
                isSending: false
            }
        default:
            return state
    }
}
export default reducer