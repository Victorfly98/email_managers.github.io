import actions from './action';
import {sendMailAPI}  from '../api/sendMailAPI';
import { all, call, takeEvery, put } from 'redux-saga/effects';
import { notification } from 'antd'

export function* saga_send_mail(action){
    try{
        console.log(action.payload.mail)
        const res = yield call(sendMailAPI,action.payload.mail);
        //console.log(res)
        if(res.status === 200){
            console.log('gửi thành công');
            notification.success({
                message: 'Gửi email thành công',
            });
        }
        else{
            console.log('Gửi thất bại');
            notification.error({
                message: 'Gửi email thất bại',
                description: 'Có lỗi trong quá trình gửi email',
            })
        }
        console.log(res)
    } catch(error) {
        console.log(error)
    }
}

export default function* listen(){
    yield takeEvery(actions.type.SEND_MAIL, saga_send_mail );
}