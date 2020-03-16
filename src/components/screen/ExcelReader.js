import React from "react";
import _ from "lodash";
import { SheetJSFT } from "../readExcelFile/types.js";
import XLSX from "xlsx";
import { InputLabel } from "@material-ui/core";
import { Input, Table, Button, Select, Upload, Form, Typography, Row, Col } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import getAction from "../../redux/action";
import { connect } from "react-redux";
const { Option } = Select;
const { Title } = Typography;
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
      Email: [],
      fileList: [],
      buffer: [],
      fileName: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  //click select file
  handleChange(e) {
    const files = e.target.files;
    console.log("e: ", e.target.files);
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
          key: e["Email"],
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
    let { buffer } = this.state;
    buffer = [];
    fileList.map(vl => {
      this.transformFile(vl.originFileObj).then(function(v) {
        buffer.push(new Uint8Array(v));
        //  console.log('v: ',v); // 1
      });
    });
    this.setState({ fileList });
    this.setState({ buffer });
  };

  // transform file to array buffer
  transformFile = file => {
    const temporaryFileReader = new FileReader();

    return new Promise((resolve, reject) => {
      temporaryFileReader.onerror = () => {
        temporaryFileReader.abort();
        reject(new DOMException("Problem parsing input file."));
      };
      temporaryFileReader.readAsArrayBuffer(file);
      temporaryFileReader.onload = async () => {
        resolve(temporaryFileReader.result);
      };
    });
  };

  // onChange data select
  onChange(value) {
    this.setState({
      ...this.state,
      selected: value,
      filter: _.filter(this.state.data, e => e.type === value)
    });
  }
  onSelectChange = selectedRowKeys => {
    const y = this.state.data;
    this.state.Email = [];
    selectedRowKeys.map(e => {
      if (e.type === undefined) {
        let type;
        let index = y.findIndex(vl => vl.email === e);
        if (index === -1) {
          type = "a";
          console.log("true");
        } else {
          type = y[index].type;
          console.log("false");
        }
        e = {
          Email: e,
          type_id: type
        };
      }
      this.state.Email.push(e);
    });
    this.setState({ selectedRowKeys });
    // this.setState({showEmail: selectedRowKeys})
    console.log("showEmail: ", this.state.Email);
  };

  // function send mail
  onSendMail = () => {
    //  console.log("item:  ", this.state.fileList);
    // this.state.fileList.map( vl => {
    // //  console.log('x: ',x)
    //   this.state.fileName.push(vl.name);
    // });
    let customers = this.state.Email;
    let subject = this.state.subject;
    let message = this.state.message;
    console.log(this.state, ": this.state");
    let formData = new FormData();
    formData.append("subject", subject);
    formData.append("text", message);
    formData.append("list_customers", JSON.stringify(customers));
    console.log(this.state.fileName, ": this.state.fileName");
    // this.state.fileName.forEach((name) => {
    //   formData.append('file_name', name);
    // })
    this.state.fileList.forEach(file => {
      formData.append("files", file.originFileObj, file.name);
    });
    console.log(formData, ": formdata");
    this.props.sendMail(formData);
  };
  render() {
    const groups = Object.keys(_.groupBy(this.state.data, "type"));
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    // object select multi file
    const itemFile = {
      action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
      onChange: this.handleChangeFile,
      multiple: true
      //  transformFile: this.transformFile
    };

    return (
      <Form>
        <Title level = {3}>SEND MAIL</Title>
        <Form.Item
          label="Chọn file chứa thông tin khách hàng:"
          name="chose_file"
        >
          <Row>
            <Col span="9">
              <Input
                type="file"
                className="form-control"
                id="file"
                accept={SheetJSFT}
                onChange={this.handleChange}
                style={{width: 300}}
              />
            </Col>
            <Col span="15">
              <Button
                disabled={!this.state.file}
                type="submit"
                className="btn_import"
                onClick={this.handleFile}
              >
                Import
              </Button>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item label="Lọc loại khách hàng: " name="type_customer">
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
        </Form.Item>  
        <Form.Item name="table_customer">
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
        </Form.Item>
        <div
          className="content_email"
          style={{
            height: 400,
            width: 600,
            marginLeft: 5
          }}
        >
          <Select
            style={{ width: "100%", textAlign: "left" }}
            mode="tags"
            aria-label="maximum height"
            placeholder="Người nhận"
            value={this.state.selectedRowKeys}
            onChange={this.onSelectChange}
            allowClear
          />
          <Input
            placeholder="Chủ đề"
            onChange={e => this.setState({ subject: e.target.value })}
            allowClear
          ></Input>
          <TextArea
            aria-label="maximum height"
            placeholder="Tin nhắn"
            // value={this.state.selectedRowKeys}
            onChange={e => this.setState({ message: e.target.value })}
            allowClear
          />

          {/* uploadfile */}
          <div style={{ textAlign: "left" }}>
            <Upload {...itemFile} fileList={this.state.fileList}>
              <Button>
                <UploadOutlined /> Upload
              </Button>
            </Upload>
          </div>
          <div style={{ textAlign: "right" }}>
            <Button type="primary" onClick={this.onSendMail}>
              Send
            </Button>
          </div>
        </div>
      </Form>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    sendMail: mail => {
      dispatch(getAction.action.sendMail(mail));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ExcelReader);
