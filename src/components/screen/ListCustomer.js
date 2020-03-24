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
      pageNumber: 1,
      countCustomer: 0
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
    if (nextprops !== this.props && nextprops.data.listTypeCustomer !== undefined ) {
      var count = 0
      const dataType =  nextprops.data.listTypeCustomer.map(vl =>{
        count++
        return {
          key: vl.type_customers,
          index: count,
          ...vl
        }
      })
      this.setState({
        listTypeCustomer: dataType,
      });
    }
   };
    showListCustomer = type => {
      this.setState({visibled: true})
      this.setState({countCustomer :this.state.listTypeCustomer.filter(vl => vl.type_customers === type)[0].numbers});
    };
  onChangePage(pageNumber) {
    console.log("Page: ", pageNumber);
  }

  render() {
    console.log(this.state.countCustomer, "listType");
    // console.log(this.state.listFilter, "listFilter");

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
          //  dataSource={this.state.listFilter}
            pagination={false}
          />
          <Pagination
            style={{ padding: 10, textAlign: "center" }}
            showQuickJumper
            defaultCurrent={2}
            total={this.state.countCustomer}
            onChange={this.onChangePage}
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListCustomer);
