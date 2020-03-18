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
          dataIndex: "address"
        },
        {
          title: "Timestamp",
          dataIndex: "time"
        },
        {
          title: "Description",
          dataIndex: "error"
        },
        {
          title: " ",
          dataIndex: "operation",
          render: (text, record) =>
            this.state.dataSource.length >= 1 ? (
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => this.handleDelete(record.key)}
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
          title: "Recipient",
          dataIndex: "address",
          width: "30%"
        },
        {
          title: "Timestamp",
          dataIndex: "time"
        },
        {
          title: "operation",
          dataIndex: "operation",
          render: (text, record) =>
            this.state.dataSource.length >= 1 ? (
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => this.handleDelete(record.key)}
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
          title: "Recipient",
          dataIndex: "address"
        },
        {
          title: "Timestamp",
          dataIndex: "time"
        },
        {
          title: "Tags",
          dataIndex: "tags"
        },
        {
          title: " ",
          dataIndex: "operation",
          render: (text, record) =>
            this.state.dataSource.length >= 1 ? (
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => this.handleDelete(record.key)}
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
      columns: [],
      selectedRowKeys: []
    };
  }
  componentDidMount() {
    if (this.props.data !== null) {
      let datasrc = this.props.data.map(e => {
        let timestamp = Date.parse(e.created_at);
        let time = new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        }).format(timestamp);
        return {
          key: e["address"],
          time: time,
          ...e
        };
      });
      this.setState({
        dataSource: datasrc
      });
    }
    this.setState({
      columns: this.columns[this.props.type]
    });
  }
  componentWillReceiveProps(nextprops) {
    console.log("nextprops", nextprops);
    console.log("type: ", this.props.type);
    if (nextprops !== this.props) {
      let datasrc = nextprops.data.map(e => {
        let timestamp = Date.parse(e.created_at);
        let time = new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        }).format(timestamp);
        return {
          key: e["address"],
          time: time,
          ...e
        };
      });
      this.setState({
        dataSource: datasrc,
        columns: this.columns[nextprops.type]
      });
    }
  }

  handleDelete = key => {
    const dataSource = [...this.state.dataSource];
    this.props.deleteMail(key);
    this.setState({
      dataSource: dataSource.filter(item => item.key !== key)
    });
  };
  onSelectChange = selectedRowKeys => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    this.setState({ selectedRowKeys });
  };
  start = () => {
    let { selectedRowKeys } = this.state;
    let { dataSource } = this.state;
    selectedRowKeys.map(id => {
      this.props.deleteMail(id);
      dataSource = dataSource.filter(item => item.id !== id);
    });
    this.setState({ dataSource });
    console.log(dataSource);
  };

  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };

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
