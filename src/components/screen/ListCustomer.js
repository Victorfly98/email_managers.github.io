import React, { Component } from "react";

import { connect } from "react-redux";
import { Typography, Button, Table, Modal } from "antd";
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
    const listCustomer = this.state.listCustomer;
    console.log(listCustomer, "aaaaa");
    console.log(listCustomer.filter(item => item[0] === type), "2323");
    this.setState({
      listFilter: listCustomer.filter(item => item[0] === type)
    });
  };

  render() {
    console.log(this.state.listTypeCustomer, "listType");

    return (
      <div>
        <Title level={3}>LIST CUSTOMER</Title>
        <Table
          columns={this.columns}
          dataSource={this.state.listTypeCustomer}
        />
        <Modal></Modal>
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
