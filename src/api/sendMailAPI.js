import axios from "axios";
import BASE_API from "./baseAPI";

export const sendMailAPI = async obj => {
  try {
    const res = await axios({
      url: BASE_API + `SendMail/`,
      method: "post",
      data: obj
    });
    //console.log(res.data)
    return res;
  } catch (error) {
    return console.log("error: ", error);
  }
};

export const getBouncesAPI = async () => {
  try {
    const res = await axios.get(BASE_API + `ListBounces`);
    // const res = await axios.get(`https://jsonplaceholder.typicode.com/users`)
    return res.data;
  } catch (error) {
    return console.log("error: ", error);
  }
};
export const getComplaintAPI = async () => {
  try {
    const res = await axios.get(BASE_API + `ListComplaints`);
    console.log(res.data, "res");
    return res.data;
  } catch (error) {
    return console.log("error: ", error);
  }
};

export const getUnsubscribesAPI = async () => {
  try {
    const res = await axios.get(BASE_API + `ListUnsubscribes`);
    // console.log(res.data, 'res');
    return res.data;
  } catch (error) {
    return console.log("error: ", error);
  }
};

export const getDeliveredAPI = async () => {
  try {
    const res = await axios.get(BASE_API + `PrintEventLog?param=delivered`);
    // console.log(res.data, 'res');
    return res.data;
  } catch (error) {
    return console.log("error: ", error);
  }
};

export const getFailedAPI = async () => {
  try {
    const res = await axios.get(BASE_API + `PrintEventLog?param=failed`);
    // console.log(res.data, 'res');
    return res.data;
  } catch (error) {
    return console.log("error: ", error);
  }
};

export const getOpenedAPI = async () => {
  try {
    const res = await axios.get(BASE_API + `PrintEventLog?param=opened`);
    // console.log(res.data, 'res');
    return res.data;
  } catch (error) {
    return console.log("error: ", error);
  }
};

export const getClickedAPI = async () => {
  try {
    const res = await axios.get(BASE_API + `PrintEventLog?param=clicked`);
    // console.log(res.data, 'res');
    return res.data;
  } catch (error) {
    return console.log("error: ", error);
  }
};

export const getListTypeCustomerAPI = async () => {
  try {
    const res = await axios.get(`http://jsonplaceholder.typicode.com/posts`);
    console.log(res.data, 'res');
    return res.data;
  } catch (error) {
    return console.log("error: ", error);
  }
};
export const getListCustomerAPI = async (userId) => {
  try {
    const res = await axios.get(`http://jsonplaceholder.typicode.com/ports?userId=${userId}`);
    console.log(res.data, 'res');
    return res.data;
  } catch (error) {
    return console.log("error: ", error);
  }
};
export const deleteMonitorMailAPI = async (address, deleteUrl) => {
  try {
    const res = await axios.delete(
      BASE_API+deleteUrl+`?address=${address}`
    );
    // const res = await axios({
    //     url: `http://192.168.100.94:8888/v1/mailgunlist/DeleteBounce`,
    //     method: 'delete',
    //     data: address
    // })
    return res;
  } catch (error) {
    return console.log("error: ", error);
  }
};

