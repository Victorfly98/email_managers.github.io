import axios from 'axios'

export const sendMailAPI = async (email) => {
    try {
        const res = await axios.post(`http://192.168.100.94:8888/v1/customers/SendMail/`, { email })
        //console.log(res.data)
        return res
    }
    catch (error) {
        return console.log('error: ', error)
    }
}
