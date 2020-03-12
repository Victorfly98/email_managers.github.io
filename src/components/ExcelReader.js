/* eslint-disable no-useless-constructor */
import React from "react";
import _ from "lodash";
import { SheetJSFT } from "./types.js";
import XLSX from "xlsx";
import { InputLabel } from "@material-ui/core";
import { Input, Table, Button, Select, Upload } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";
import getAction from '../../src/redux/action';
import {connect} from 'react-redux'
const { Option } = Select;
/* eslint-disable no-useless-constructor */
// import { make_cols } from "./MakeColumns.js";
const { TextArea } = Input;
const columns = [
  {
    title: "Email",
    dataIndex: "email"
  },
  {
    title: "Họ và tên",
    dataIndex: "name"
  },
  {
    title: "Loại khách hàng",
    dataIndex: "type"
  }
];

class ExcelReader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      value: "",
      filter: [],
      selected: "all",
      selectedRowKeys: [],
      subject: "",
      message: "",
      showEmail: [],
      fileList: [],
      buffer: []
      // groups: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  //click select file
  handleChange(e) {
    const files = e.target.files;
    console.log('e: ',e.target.files)
    if (files && files[0]) this.setState({ file: files[0] });

    this.state.fileList.map(vl => {
      var file = new File(vl)
      //  console.log(blob)
        this.transformFile(file)
      })
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
          key: {Email: e["Email"], type_id: e["Loại KH"]},
          name: e["Họ và tên"],
          type: e["Loại KH"],
          stt: e["STT"],
          email: e["Email"]
        };
      });
      /* Update state */
      this.setState({ data: result });
    };
    if (rABS) {
      reader.readAsBinaryString(this.state.file);
    } else {
      reader.readAsArrayBuffer(this.state.file);
    }
    // this.setState({buffer: reader})
  //  console.log('filessssss: ',this.state.file.name)
  }

  // function select multi file
  handleChangeFile = info => {
    let fileList = [...info.fileList];
    fileList = fileList.map(file => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });
    this.setState({ fileList });
  };

  transformFile = file => {
    return new Promise(resolve => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    this.setState({buffer: reader.result})
    console.log('data: ',reader)
    })
  }

  // onChange data select
  onChange(value) {
    this.setState({
      ...this.state,
      selected: value,
      filter: _.filter(this.state.data, e => e.type === value)
    });
  }
  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });

    this.state.showEmail= []
    selectedRowKeys.map(e => {
      this.state.showEmail.push(e.Email)
    })

    console.log("selectedRowKeys changed: ", selectedRowKeys);
  };
  render() {
    // console.log("data: ", this.state.data);
    const groups = Object.keys(_.groupBy(this.state.data, "type"));
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    // object select multi file
    const itemFile = {
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      onChange: this.handleChangeFile,
      multiple: true,
    //  transformFile: this.transformFile
    };

    return (
      <div>
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
        {this.state.selected === "all" ? (
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={this.state.data}
          ></Table>
        ) : (
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={this.state.filter}
          ></Table>
        )}
        <div
          className="content_email"
          style={{ height: 400, width: 600, alignItems: "right", marginLeft: 5 }}
        >
          <TextArea
            aria-label="maximum height"
            placeholder="Người nhận"
            value={this.state.showEmail}
          />
          <Input placeholder="Chủ đề" onChange={e => this.setState({subject: e.target.value})}></Input>
          <TextArea
            aria-label="maximum height"
            placeholder="Tin nhắn"
            // value={this.state.selectedRowKeys}
            onChange={e => this.setState({message: e.target.value})}
          />
          
          {/* uploadfile */}
          <div style={{textAlign: 'left'}}>
          <Upload {...itemFile} fileList={this.state.fileList} >
            <Button>
              <UploadOutlined /> Upload
            </Button>
          </Upload>
          </div>

          <Button type="primary"
            onClick = {()=>{
              console.log('item:  ',this.state.fileList)
              let customers = this.state.selectedRowKeys
              //console.log(customers)
              let subject = this.state.subject
              let message = this.state.message
              let buffer = this.state.buffer.result
              console.log(buffer)
              this.props.sendMail({subject: subject, text :message,list_customers: customers, file_name: ['test_mail - Copy'], buffer: buffer})
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