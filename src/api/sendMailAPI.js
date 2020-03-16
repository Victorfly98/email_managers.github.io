import axios from 'axios'

export const sendMailAPI = async (obj) => {
    try {
        const res = await axios.post(`http://192.168.100.94:8888/v1/customers/SendMail/`, { obj })
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