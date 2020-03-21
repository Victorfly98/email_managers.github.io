import React from "react";
import _ from "lodash";
import { SheetJSFT } from "../readExcelFile/types.js";
import XLSX from "xlsx";
import {
  Input,
  Table,
  Button,
  Select,
  Upload,
  Form,
  Typography,
  Row,
  Col,
  Modal,
  Alert,
  DatePicker,
} from "antd";
import { UploadOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import getAction from "../../redux/action";
import { connect } from "react-redux";
import moment from "moment";

const { confirm } = Modal;
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
      fileName: [],
      selectedRowKeysReply: [],
      TimeSend: Date.now(),
      isSending: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSendMail = this.onSendMail.bind(this);
    this.onClick = this.onClick.bind(this);
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

    this.setState({ fileList });
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
    const dataRoot = this.state.data;
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    this.state.Email = []
    const checkMail = []
    selectedRowKeys.map(vl => {
      if (filter.test(vl) === true) checkMail.push(vl)
    })
    checkMail.map(e => {
      if (e.type === undefined) {
        let type;
        let name;
        let index = dataRoot.findIndex(vl => vl.email === e);
        if (index === -1) {
          type = "a";
          name = "";
          //  console.log("true");
        } else {
          type = dataRoot[index].type;
          name = dataRoot[index].name;
          //  console.log("false");
        }
        e = {
          Email: e,
          type_id: type,
          Name: name
        };
      }
      this.state.Email.push(e);
    });
    this.setState({ selectedRowKeys: checkMail });
    // this.setState({showEmail: selectedRowKeys})
    console.log("showEmail: ", this.state.Email);
  };

  onSelectChangeReply = selectedRowKeysReply => {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const checkMail = []
    selectedRowKeysReply.map(vl => {
      if (filter.test(vl) === true) checkMail.push(vl)
    })
    this.setState({ selectedRowKeysReply: checkMail })
  };

  // function disable datetime mail
  disabledDate = current => {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  }
  // onChangeDateTime to send
  onChangeDateTime = value => {
    if (value === null || value === undefined) {
      var time = Date.now();
      this.setState({ TimeSend: time.valueOf() })
    }
    else
      this.setState({ TimeSend: Date.parse(value._d).valueOf() })
  }

  // function send mail
  onSendMail = () => {
    let customers = this.state.Email;
    let subject = this.state.subject;
    let message = this.state.message;
    let reply = this.state.selectedRowKeysReply;
    let dateTime = this.state.TimeSend;
    console.log(this.state, ": this.state");
    let formData = new FormData();
    formData.append("subject", subject);
    formData.append("text", message);
    formData.append("email_reply_to", JSON.stringify(reply));
    formData.append("time_deliver", dateTime);
    formData.append("list_customers", JSON.stringify(customers));
    console.log(this.state.fileName, ": this.state.fileName");
    this.state.fileList.forEach(file => {
      formData.append("files", file.originFileObj, file.name);
    });
    console.log(formData, ": formdata");
    this.props.sendMail(formData);
    this.setState({ isSending: true })
  };
  onClick() {
    const ref = this;
    if (this.state.subject === "" && this.state.message === "") {
      confirm({
        title: "Do you want to send mail?",
        icon: <ExclamationCircleOutlined />,
        content: "Subject or Message is null.",
        onOk() {
          ref.onSendMail();
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          }).catch(() => console.log("Send errors!"));
        },
        onCancel() { }
      });
    } else {
      ref.onSendMail();
    }
  }

  componentWillReceiveProps(nextprops) {
    if (this.props !== nextprops && nextprops.send.isSended === true) {
      this.setState({
        Email: [],
        subject: "",
        message: "",
        fileList: [],
        selectedRowKeys: [],
        selectedRowKeysReply: [],
        TimeSend: Date.now(),
      });
    }
    this.setState({ isSending: nextprops.send.isSending })
  }

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
    console.log(this.state.isSending, 'selectedRowKeys')
    return (
      <Form>
        <Title level={3}>SEND MAIL</Title>
        <Form.Item
          label="Chọn file chứa thông tin khách hàng:"
          name="chose_file"
        >
          <Row>
            <Col flex="300px">
              <Input
                type="file"
                className="form-control"
                id="file"
                accept={SheetJSFT}
                onChange={this.handleChange}
                style={{ width: 300, marginRight: 10 }}
              // onClick={this.handleFile}
              />
            </Col>
            <Col flex="auto">
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
          ></Select>
          <Select
            style={{ width: "100%", textAlign: "left" }}
            mode="tags"
            aria-label="maximum height"
            placeholder="Reply To"
            value={this.state.selectedRowKeysReply}
            onChange={this.onSelectChangeReply}
            allowClear
          />
          <Input
            placeholder="Chủ đề"
            onChange={e => this.setState({ subject: e.target.value })}
            allowClear
            value={this.state.subject}
          ></Input>
          <TextArea
            rows={6}
            aria-label="maximum height"
            placeholder="Tin nhắn"
            onChange={e => this.setState({ message: e.target.value })}
            value={this.state.message}
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
            <DatePicker
              format="YYYY-MM-DD HH:mm:ss"
              disabledDate={this.disabledDate}
              onChange={this.onChangeDateTime}
              showTime
              style={{marginRight: 20}}
            />
            <Button
              type="primary"
              onClick={this.onClick}
              loading={this.state.isSending}
            >
              Send
            </Button>
          </div>
        </div>
      </Form>
    );
  }
}

const mapStateToProps = state => {
  return {
    send: state.reducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendMail: mail => {
      dispatch(getAction.action.sendMail(mail));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ExcelReader);
