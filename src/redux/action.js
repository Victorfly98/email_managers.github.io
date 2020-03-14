const type = {
    SEND_MAIL: 'SEND_MAIL',
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
}

export default {type, action}