const type = {
  SEND_MAIL: "SEND_MAIL",
  GET_MONITOR_EMAIL: "GET_MONITOR_EMAIL",
  UPDATE_STATE: "UPDATE_STATE",
  DELETE_MONITOR_EMAIL: "DELETE_MONITOR_EMAIL",
  GET_EVENT: "GET_EVENT",
  GET_LIST_TYPE_CUSTOMER: "GET_LIST_TYPE_CUSTOMER",
  GET_LIST_CUSTOMER: "GET_LIST_CUSTOMER"
};

const action = {
  sendMail: mail => {
    console.log(mail, ":mail");
    return {
      type: type.SEND_MAIL,
      payload: {
        mail
      }
    };
  },
  getMonitorEmail: () => {
    return {
      type: type.GET_MONITOR_EMAIL,
      payload: {}
    };
  },
  deleteMonitorEmail: monitor => {
    return {
      type: type.DELETE_MONITOR_EMAIL,
      payload: {
        monitor
      }
    };
  },
  getEvent: () => {
    return {
      type: type.GET_EVENT,
      payload: {}
    };
  },
  getListTypeCustomer: () => {
    return {
      type: type.GET_LIST_TYPE_CUSTOMER,
      payload: {}
    };
  },
  getListCustomer: (infoPage) => {
    return {
      type: type.GET_LIST_CUSTOMER,
      payload: {
        infoPage
      }
    };
  },
  
  updateState: state => {
    return {
      type: type.UPDATE_STATE,
      payload: {
        state
      }
    };
  }
};

export default { type, action };
