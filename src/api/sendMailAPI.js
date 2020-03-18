import axios from "axios";

export const sendMailAPI = async obj => {
  try {
    const res = await axios({
      url: `http://192.168.100.94:8888/v1/customers/SendMail/`,
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
    const res = await axios.get(
      `http://192.168.100.94:8888/v1/customers/ListBounces`
    );
    // const res = await axios.get(`https://jsonplaceholder.typicode.com/users`)
    return res.data;
  } catch (error) {
    return console.log("error: ", error);
  }
};
export const getComplaintAPI = async () => {
  try {
    const res = await axios.get(
      `http://192.168.100.94:8888/v1/mailgunlist/ListComplaints`
    );
    console.log(res.data, "res");
    return res.data;
  } catch (error) {
    return console.log("error: ", error);
  }
};

export const getUnsubscribesAPI = async () => {
  try {
    const res = await axios.get(
      `http://192.168.100.94:8888/v1/mailgunlist/ListUnsubscribes`
    );
    // console.log(res.data, 'res');
    return res.data;
  } catch (error) {
    return console.log("error: ", error);
  }
};

export const deleteMonitorMailAPI = async address => {
  try {
    const res = await axios.delete(
      `http://192.168.100.94:8888/v1/mailgunlist/DeleteBounce/${address}`
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
