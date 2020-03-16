import axios from 'axios'

export const sendMailAPI = async (obj) => {
    try {
        const res = await axios({
            url: `http://127.0.0.1:8089/v1/customers/SendMail/`,
            method: 'post',
            data: obj
        })
        //console.log(res.data)
        return res
    }
    catch (error) {
        return console.log('error: ', error)
    }
}

export const getMonitorMailAPI = async (obj) => {
    try {
        const res = await axios.get(`https://jsonplaceholder.typicode.com/users`)
        //console.log(res.data)
        return res.data
    }
    catch (error) {
        return console.log('error: ', error)
    }
}