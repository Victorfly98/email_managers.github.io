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

export const deleteMonitorMailAPI = async address => {
  try {
    const res = await axios.delete(
      BASE_API + `DeleteBounce?address=${address}`
    );
    // const res = await axios({
    //     url: `http://192.168.100.94:8888/v1/mailgunlist/DeleteBounce`,
    //     method: 'delete',
    //     data: address
    // })
    //console.log(res.data)
    return res;
  } catch (error) {
    return console.log("error: ", error);
  }
};
