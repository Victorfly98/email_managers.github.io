import React, { Component } from "react";

import { connect } from "react-redux";
import { Typography, Button, Table, Modal, Pagination } from "antd";
import getAction from "../../redux/action";
import _ from "lodash";

const { Title } = Typography;

class ListCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listTypeCustomer: [],
      listCustomer: [],
      listFilter: [],
      visibled: false,
      type: "",
      countCustomer: 0,
      type_customers: "",
      pageNumber: 1
    };
    this.columns = [
      [
        {
          title: "STT",
          dataIndex: "index"
        },
        {
          title: "Customer Type",
          dataIndex: "key"
          //   key: "time",
          //   sorter: (a, b) => Date.parse(a.time) - Date.parse(b.time)
        },
        {
          title: "Number of Customer",
          dataIndex: "numbers"
        },
        {
          title: " ",
          //   dataIndex: "operation",
          render: record =>
            this.state.listTypeCustomer.length >= 1 ? (
              <Button
                style={{
                  borderRadius: 16,
                  backgroundColor: "#f7e9e9",
                  color: "#c02428"
                }}
                onClick={() => this.showListCustomer(record.key)}
              >
                Detail
              </Button>
            ) : null
        }
      ],
      [
        {
          title: "STT",
          dataIndex: "index"
        },
        {
          title: "Customer Name",
          dataIndex: "Name"
          //   key: "time",
          //   sorter: (a, b) => Date.parse(a.time) - Date.parse(b.time)
        },
        {
          title: "Customer Email",
          dataIndex: "key"
        }
      ]
    ];
  }

  componentDidMount = () => {
    this.props.getListTypeCustomer();
  };
  componentWillReceiveProps = nextprops => {
    if (nextprops !== this.props) {
      if (nextprops.data.listTypeCustomer !== this.props.data.listTypeCustomer) {
        var count = 0
        const dataType = nextprops.data.listTypeCustomer.map(vl => {
          count++
          return {
            key: vl.type_customers,
            index: count,
            ...vl
          }
        })
        this.setState({
          listTypeCustomer: dataType
        })
      }
      if (nextprops.data.getListCustomer !== this.props.data.getListCustomer) {
        console.log(nextprops.data.getListCustomer,'nextprops.data.getListCustomer')
        var countCustomer = this.state.pageNumber * 10 - 10
        const listCustomer = nextprops.data.getListCustomer.map(vl => {
          countCustomer = countCustomer + 1
          return {
            index: countCustomer,
            key: vl.Email,
            ...vl
          }
        })
        this.setState({
          listCustomer: listCustomer
        });
      }
    }
  };
  showListCustomer = type => {
    this.setState({ visibled: true })
    const datafilterType = this.state.listTypeCustomer.filter(vl => vl.type_customers === type)
    const type_customers = datafilterType[0].key
    this.setState({ countCustomer: datafilterType[0].numbers, type_customers: type_customers });
    this.props.getListCustomer({ type_customers: type_customers, page_number: this.state.pageNumber })
  };

  render() {
    //  console.log(this.state.type_customers, "listType");
    // console.log(this.state.listFilter, "listFilter");
    const {type_customers} = this.state
    return (
      <div className="list_type_customer">
        <Title level={3}>LIST TYPE CUSTOMER</Title>
        <Table
          columns={this.columns[0]}
          dataSource={this.state.listTypeCustomer}
        />
        <Modal
          width="70%"
          title="LIST CUSTOMER"
          style={{ textAlign: "center" }}
          visible={this.state.visibled}
          onCancel={() => {
            this.setState({ visibled: false });
          }}
          footer={[]}
        >
          <Table
            columns={this.columns[1]}
            dataSource={this.state.listCustomer}
            pagination={false}
          />
          <Pagination
            style={{ padding: 10, textAlign: "center" }}
            showQuickJumper
            defaultCurrent={this.state.pageNumber}
            total={this.state.countCustomer}
            onChange={pageNumber => {
              this.setState({pageNumber: pageNumber})
              this.props.getListCustomer({ type_customers: type_customers, page_number: pageNumber })
            }}
          />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.reducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getListTypeCustomer: () => {
      dispatch(getAction.action.getListTypeCustomer());
    },
    getListCustomer: (infoPage) => {
      dispatch(getAction.action.getListCustomer(infoPage));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListCustomer);
