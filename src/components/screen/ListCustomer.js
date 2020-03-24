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
      type: ""
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
          dataIndex: "sum"
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
          dataIndex: "id"
        },
        {
          title: "Customer Name",
          dataIndex: "title"
          //   key: "time",
          //   sorter: (a, b) => Date.parse(a.time) - Date.parse(b.time)
        },
        {
          title: "Customer Email",
          dataIndex: "body"
        }
      ]
    ];
  }

  componentDidMount = () => {
    this.props.getListTypeCustomer();
  };
  componentWillReceiveProps = nextprops => {
    if (nextprops.listTypeCustomer !== this.props.getListTypeCustomer) {
      let groupTypes = _.groupBy(
        nextprops.listTypeCustomer.listTypeCustomer,
        "userId"
      );
      var count = 0;
      var listType = Object.keys(groupTypes).map(function(key) {
        count++;
        return { key: key, sum: groupTypes[key].length, index: count };
      });
      var listCustomerByType = Object.keys(groupTypes).map(function(key) {
        count++;
        return [key, groupTypes[key]];
      });
      console.log(listCustomerByType, "a");
      this.setState({
        listTypeCustomer: listType,
        listCustomer: listCustomerByType
      });
    }
  };
  showListCustomer = type => {
    console.log(type, "type");
    const listCustomer = this.state.listCustomer.filter(
      item => item[0] === type
    );
    // console.log(listCustomer, "aaaaa");
    // console.log(listCustomer[0][1], "2323");
    this.setState({
      listFilter: listCustomer[0][1],
      visibled: true
    });
  };
  onChangePage(pageNumber) {
    console.log("Page: ", pageNumber);
  }

  render() {
    console.log(this.state.listTypeCustomer, "listType");
    console.log(this.state.listFilter, "listFilter");

    return (
      <div className="list_type_customer">
        <Title level={3}>LIST TYPE CUSTOMER</Title>
        <Table
          columns={this.columns[0]}
          dataSource={this.state.listTypeCustomer}
          pagination={false}
        />
        <Pagination
          style={{ padding: 10, textAlign: "center" }}
          showQuickJumper
          defaultCurrent={2}
          total={10}
          onChange={this.onChangePage}
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
            dataSource={this.state.listFilter}
            pagination={false}
          />
          <Pagination
            style={{ padding: 10, textAlign: "center" }}
            showQuickJumper
            defaultCurrent={2}
            total={10}
            onChange={this.onChangePage}
          />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.reducer,
    listTypeCustomer: state.reducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getListTypeCustomer: () => {
      dispatch(getAction.action.getListTypeCustomer());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListCustomer);
