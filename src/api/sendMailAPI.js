import axios from 'axios'

export const sendMailAPI = async (obj) => {
    try {
        const res = await axios({
            url: `http://192.168.100.94:8888/v1/customers/SendMail/`,
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

export const getMonitorMailAPI0 = async (obj) => {
    try {
        const res = await axios.get(`http://192.168.100.94:8888/v1/customers/ListBounces`)
        return res.data
    }
    catch (error) {
        return console.log('error: ', error)
    }
}

export const getMonitorMailAPI1 = async () => {
    try {
        const res = await axios.get(`https://jsonplaceholder.typicode.com/users`)
        return res.data
    }
    catch (error) {
        return console.log('error: ', error)
    }
}

export const getMonitorMailAPI2 = async () => {
    try {
        const res = await axios.get(`https://jsonplaceholder.typicode.com/posts`)
        console.log(res.data, 'res');
        return res.data
        
        
    }
    catch (error) {
        return console.log('error: ', error)
    }
}

export const deleteMonitorMailAPI = async (id) => {
    try {
        const res = await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
        //console.log(res.data)
        return res
    }
    catch (error) {
        return console.log('error: ', error)
    }
}