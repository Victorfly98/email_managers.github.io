import React from "react";
import { Table, Popconfirm, Button } from "antd";
import getAction from "../../redux/action";
import { connect } from "react-redux";
// import _ from "lodash";

export class TableMonitor extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      [
        {
          title: "Recipient",
          dataIndex: "name"
        },
        {
          title: "Timestamp",
          dataIndex: "username"
        },
        {
          title: "Description",
          dataIndex: "email"
        },
        {
          title: " ",
          dataIndex: "operation",
          render: (text, record) =>
            this.state.dataSource.length >= 1 ? (
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => this.handleDelete(record.id)}
              >
                <Button
                  style={{
                    borderRadius: 16,
                    backgroundColor: "#f7e9e9",
                    color: "#c02428"
                  }}
                >
                  Delete
                </Button>
              </Popconfirm>
            ) : null
        }
      ],
      [
        {
          title: "abc",
          dataIndex: "email",
          width: "30%"
        },
        {
          title: "xyz",
          dataIndex: "username"
        },
        {
          title: "123",
          dataIndex: "email"
        },
        {
          title: "operation",
          dataIndex: "operation",
          render: (text, record) =>
            this.state.dataSource.length >= 1 ? (
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => this.handleDelete(record.id)}
              >
                <Button
                  style={{
                    borderRadius: 16,
                    backgroundColor: "#f7e9e9",
                    color: "#c02428"
                  }}
                >
                  Delete
                </Button>
              </Popconfirm>
            ) : null
        }
      ]
    ];
    this.state = {
      dataSource: [],
      update: 0,
      columns: [],
      selectedRowKeys: [],
    };
  }

  handleDelete = id => {
    const dataSource = [...this.state.dataSource];
    this.props.deleteMail(id)
    this.setState({
      dataSource: dataSource.filter(item => item.id !== id)
    });
  };
  onSelectChange = selectedRowKeys => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    this.setState({ selectedRowKeys });
  };
  start = () => {
    let {selectedRowKeys} = this.state;
    let {dataSource} = this.state;
    selectedRowKeys.map(id => {
      this.props.deleteMail(id)
      dataSource = dataSource.filter(item => item.id !== id)
    })
    this.setState({dataSource})
    console.log(dataSource)
  };

  render() {
    if (this.state.update < 2) {
      this.state.dataSource = this.props[0];
      this.state.update += 1;
    }
    this.state.columns = this.columns[this.props.type];
    
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    this.state.dataSource = this.state.dataSource.map(e => {
      return {
        key: e["id"],
        ...e
      };
    });
    const { dataSource } = this.state;
    console.log(dataSource, "dataSource");

    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div>
        <Button
          onClick={this.start}
          disabled={!hasSelected}
          style={{
            borderRadius: 16,
            backgroundColor: "#f7e9e9",
            color: "#c02428",
            marginBottom: 20
          }}
        >
          Remove Selected
        </Button>
        <Table
          dataSource={dataSource}
          columns={this.state.columns}
          rowSelection={rowSelection}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    deleteMail: id => {
      dispatch(getAction.action.deleteMonitorEmail(id));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TableMonitor);