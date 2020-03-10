/* eslint-disable no-useless-constructor */
import React from "react";
import _ from "lodash";
import { SheetJSFT } from "./types.js";
import XLSX from "xlsx";
import { make_cols } from "./MakeColumns.js";
import { InputLabel } from "@material-ui/core";
import { Input, Table, Button, Select } from "antd";
import "antd/dist/antd.css";
import getAction from '../../src/redux/action';
import {connect} from 'react-redux'

const { Column } = Table;
const { TextArea } = Input;
const { Option } = Select;
export class ExcelReader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      cols: [],
      value: "",
      filter: [],
      selected: 'all'
      // groups: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  //click select file
  handleChange(e) {
    const files = e.target.files;
    if (files && files[0]) this.setState({ file: files[0] });
  }
  handleFile(file /*:File*/) {
    /* Boilerplate to set up FileReader */
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = e => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, {
        // header: 1
      });
      const result = _.map(data, e => {
        return {
          name: e["Họ và tên"],
          type: e["Loại KH"],
          stt: e["STT"],
          email: e["Email"]
        };
      });
      // console.log(result, "result");

      /* Update state */
      this.setState({ data: result, cols: make_cols(ws["!ref"]) }, () => {
        console.log(JSON.stringify(this.state.data, null, 2));
      });
    };
    if (rABS) {
      reader.readAsBinaryString(this.state.file);
    } else {
      reader.readAsArrayBuffer(this.state.file);
    }
  }
  // onChange data select
  onChange(value) {
    this.setState({...this.state, selected: value, filter: _.filter(this.state.data, (e) => e.type === value)});
  }

  render() {
    console.log("data: ", this.state.data);
    const groups = Object.keys(_.groupBy(this.state.data, "type"));
    console.log("groups: ", groups);
    return (
      <div>
        <form className="form-inline">
          <div className="excel_reader">
            <InputLabel />
            GỬI MAIL
            <div className="chose_file">
              Chọn file chứa thông tin khách hàng:
              <Input
                type="file"
                className="form-control"
                id="file"
                accept={SheetJSFT}
                onChange={this.handleChange}
              />
            </div>
            <Button
              disabled={!this.state.file}
              type="submit"
              className="btn_import"
              onClick={this.handleFile}
            >
              Import
            </Button>
          </div>
        </form>
        <InputLabel style={{ marginTop: 20 }}>Loại khách hàng: </InputLabel>
        <Select
          style={{ width: 170, textAlign: "center" }}
          value={this.state.selected}
          onChange={this.onChange}
        >
          <Option value="all">Tất cả</Option>
          {_.map(groups, g => {
            return (
              <Option key={g} value={g}>
                {g}
              </Option>
            );
          })}
        </Select>
        {
          this.state.selected === 'all' ?
          <Table dataSource={this.state.data}>
          <Column title="STT" dataIndex="stt" key="stt" />
          <Column title="Email" dataIndex="email" key="email" />
          <Column title="Họ và tên" dataIndex="name" key="name" />
          <Column title="Loại Khách Hàng" dataIndex="type" key="type" />
        </Table>
          :
          <Table dataSource={this.state.filter}>
          <Column title="STT" dataIndex="stt" key="stt" />
          <Column title="Email" dataIndex="email" key="email" />
          <Column title="Họ và tên" dataIndex="name" key="name" />
          <Column title="Loại Khách Hàng" dataIndex="type" key="type" />
        </Table>
        }
        <div className="content_email">
          <Input placeholder="Người nhận"></Input>
          <Input placeholder="Chủ đề"></Input>
          <TextArea
            rowsMax={6}
            aria-label="maximum height"
            placeholder="Tin nhắn"
          />
          <Button type="primary"
            onClick = {()=>{
              let customers = this.state.data
                // this.state.data.map(vl => {
                //   customers.push(vl.email)
                // })
                console.log(customers)
                this.props.sendMail({subject: 'test', text :'test noi dung',listCustomers: customers, filename: [], buffer: null,  })
            }}
          >Send</Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
      
  }
}

const mapDispatchToProps = dispatch => {
  return{
      sendMail: (mail) => {
          dispatch(getAction.action.sendMail(mail));
      },
  }
}
export default connect( mapStateToProps, mapDispatchToProps )( ExcelReader )