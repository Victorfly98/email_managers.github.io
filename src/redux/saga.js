import actions from "./action";
import {
  sendMailAPI,
  getBouncesAPI,
  getComplaintAPI,
  getUnsubscribesAPI,
  deleteMonitorMailAPI,
  getDeliveredAPI,
  getFailedAPI,
  getOpenedAPI,
  getClickedAPI
} from "../api/sendMailAPI";
import { call, takeEvery, put } from "redux-saga/effects";
import { notification, Modal } from "antd";

export function* saga_send_mail(action) {
  try {
    console.log(action.payload.mail);
    console.log(action.payload.mail, ": action.payload.mail");
    const res = yield call(sendMailAPI, action.payload.mail);
    //console.log(res)
    if (res.status === 200) {
      yield put(
        actions.action.updateState({
          isSended: true
        })
      );
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
  } catch (error) {
    yield put(
      actions.action.updateState({
        isSending: false
      })
    );
    console.log(error);
    notification.error({
      message: "Gửi email thất bại",
      description: "Có lỗi trong quá trình gửi email vui lòng kiểm tra lại đường truyền"
    });
  }
}

export function* saga_get_monitor_mail(action) {
  try {
    const monitor = yield call(getBouncesAPI);
    const monitor1 = yield call(getComplaintAPI);
    const monitor2 = yield call(getUnsubscribesAPI);
    if(monitor !== undefined || monitor1!==undefined || monitor2!==undefined)
    yield put(
      actions.action.updateState({
        bouncesEmail: monitor,
        complaintEmail: monitor1,
        unsubEmail: monitor2,
      })
    );
  } catch (error) {
    yield put(
      actions.action.updateState({
        isLoading: false
      })
    );
    Modal.error({
      title: "Gửi email thất bại",
      content: "Có lỗi trong quá trình kết nối với server"
    });
    console.log(error);
  }
}

export function* saga_get_event(action) {
  try {
    const delivered = yield call(getDeliveredAPI);
    const failed = yield call(getFailedAPI);
    const opened = yield call(getOpenedAPI);
    const clicked = yield call(getClickedAPI);
    if(delivered !== undefined || failed !==undefined || opened !==undefined || clicked !==undefined)
    yield put(
      actions.action.updateState({
        deliver: delivered,
        failed: failed,
        opened: opened,
        clicked: clicked,
      })
    );
  } catch (error) {
    yield put(
      actions.action.updateState({
        isLoading: false
      })
    );
    Modal.error({
      title: "Gửi email thất bại",
      content: "Có lỗi trong quá trình kết nối với server"
    });
    console.log(error);
  }
}

export function* saga_delete_monitor_mail(action) {
  try {
    console.log(action.payload, 'aasdasdasd');
    const address = action.payload.monitor.address;
    const deleteUrl = action.payload.monitor.deleteURL;
    const monitor = yield call(deleteMonitorMailAPI, address, deleteUrl);
    console.log(monitor);
  } catch (error) {
    console.log(error);
  }
}

export default function* listen() {
  yield takeEvery(actions.type.SEND_MAIL, saga_send_mail);
  yield takeEvery(actions.type.GET_MONITOR_EMAIL, saga_get_monitor_mail);
  yield takeEvery(actions.type.DELETE_MONITOR_EMAIL, saga_delete_monitor_mail);
  yield takeEvery(actions.type.GET_EVENT, saga_get_event);
}
