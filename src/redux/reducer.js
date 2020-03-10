import actions from './action'

const initialState = {

}

const reducer = (state = initialState, action) => {
    console.log('action: ',action)
    switch (action.type) {
        case actions.type.SEND_MAIL:
            return {
                ...state,
            }
        default:
            return state
    }
}
export default reducer