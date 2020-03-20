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
                onConfirm={() => this.handleDelete({address: record.key, deleteURL: 'DeleteBounce'})}
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
                onConfirm={() => this.handleDelete({address: record.key, deleteURL: ''})}
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
                onConfirm={() => this.handleDelete({address: record.key, deleteURL: 'DeleteUnsubcribe'})}
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

  loadDataFromProps(props){
    let datasrc = props.data.map(e => {
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


  componentDidMount() {
    if (this.props.data !== null) {
      this.loadDataFromProps(this.props)
    }
    this.setState({
      columns: this.columns[this.props.type]
    });
  }
  componentWillReceiveProps(nextprops) {
    console.log("nextprops", nextprops);
    console.log("type: ", this.props.type);
    if (nextprops !== this.props) {
      this.loadDataFromProps(nextprops)
      this.setState({columns: this.columns[nextprops.type]})
    }
  }

  handleDelete = (monitor) => {
    const dataSource = [...this.state.dataSource];
    this.props.deleteMail(monitor);
    this.setState({
      dataSource: dataSource.filter(item => item.key !== monitor.address)
    });
  };
  onSelectChange = selectedRowKeys => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    this.setState({ selectedRowKeys });
  };
  
  //xét type của tab
  handleDeleteSelectMail = () => {
    let deleteURL ;
    if (this.props.type === '0') deleteURL = 'DeleteBounce'
    if (this.props.type === '1') deleteURL = ''
    if (this.props.type === '2') deleteURL = 'DeleteUnsubcribe'
    let { selectedRowKeys } = this.state;
    let { dataSource } = this.state;
    selectedRowKeys.map(address => {
      this.props.deleteMail({address: address, deleteURL: deleteURL});
      dataSource = dataSource.filter(item => item.address !== address);
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
          onClick={this.handleDeleteSelectMail}
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
    deleteMail: monitor => {
      dispatch(getAction.action.deleteMonitorEmail(monitor));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TableMonitor);
