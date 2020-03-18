import actions from "./action";
import { sendMailAPI, getBouncesAPI,getComplaintAPI, getUnsubscribesAPI, deleteMonitorMailAPI } from "../api/sendMailAPI";
import { call, takeEvery, put} from "redux-saga/effects";
import { notification } from "antd";

export function* saga_send_mail(action) {
  try {
    console.log(action.payload.mail)
    console.log(action.payload.mail, ': action.payload.mail');
    const res = yield call(sendMailAPI, action.payload.mail);
    //console.log(res)
    if (res.status === 200) {
      console.log("gửi thành công");
      notification.success({
        message: "Gửi email thành công"
      });
    } else {
      console.log("Gửi thất bại");
      notification.error({
        message: "Gửi email thất bại",
        description: "Có lỗi trong quá trình gửi email"
      });
    }
    console.log(res);
  } catch (error) {
    console.log(error);
    notification.error({
      message: "Gửi email thất bại",
      description: "Có lỗi trong quá trình gửi email"
    });
  }
}


export function* saga_get_monitor_mail(action) {
  try {
    const monitor = yield call (getBouncesAPI);
    const monitor1 = yield call (getComplaintAPI);
    const monitor2 = yield call (getUnsubscribesAPI);
    yield put(actions.action.updateState({
      bouncesEmail : monitor,
      complaintEmail : monitor1,
      unsubEmail : monitor2
    }))
  } catch (error) {
    console.log(error);
  }
}

export function* saga_delete_monitor_mail(action) {
  try {
    const monitor = yield call (deleteMonitorMailAPI, action.payload.id)
    console.log(monitor)
  } catch (error) {
    console.log(error);
  }
}

export default function* listen() {
  yield takeEvery(actions.type.SEND_MAIL, saga_send_mail);
  yield takeEvery(actions.type.GET_MONITOR_EMAIL, saga_get_monitor_mail);
  yield takeEvery(actions.type.DELETE_MONITOR_EMAIL, saga_delete_monitor_mail);
}
