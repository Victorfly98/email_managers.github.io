const type = {
    SEND_MAIL: 'SEND_MAIL',
    GET_MONITOR_EMAIL: 'GET_MONITOR_EMAIL',
    UPDATE_STATE: 'UPDATE_STATE'
}

const action = {
    sendMail: (mail) => {
        console.log(mail, ':mail')
        return{
            type: type.SEND_MAIL,
            payload: {
                mail
            }
        }
    },
    getMonitorEmail: () => {
        return {
            type: type.GET_MONITOR_EMAIL,
            payload: {}
        }
    },
    updateState: (state) => {
        return {
            type: type.UPDATE_STATE,
            payload: {
                state
            }
        }
    }
}

export default {type, action}