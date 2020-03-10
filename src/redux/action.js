const type = {
    SEND_MAIL: 'SEND_MAIL',
}

const action = {
    sendMail: (mail) => {
        return{
            type: type.SEND_MAIL,
            payload: {
                mail
            }
        }
    },
}

export default {type, action}