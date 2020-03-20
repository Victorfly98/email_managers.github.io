import React from "react";
import { Table, Typography } from "antd";
import { connect } from "react-redux";
// import _ from "lodash";

const { Title } = Typography;

export class TableEvent extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      [
        {
          title: "Index",
          dataIndex: "index"
        },
        {
          title: "Recipient",
          dataIndex: "address"
        },
        {
          title: "Timestamp",
          dataIndex: "time"
        }
      ],
      [
        {
          title: "Index",
          dataIndex: "index"
        },
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
          title: 'Reason',
          dataIndex: 'reason'
        }
      ],
      [
        {
          title: "Index",
          dataIndex: "index"
        },
        {
          title: "Recipient",
          dataIndex: "address"
        },
        {
          title: "Timestamp",
          dataIndex: "time"
        }
      ],
      [
        {
          title: "Index",
          dataIndex: "index"
        },
        {
          title: "Recipient",
          dataIndex: "address"
        },
        {
          title: "Timestamp",
          dataIndex: "time"
        }
      ]
    ];
    this.state = {
      dataSource: [],
      columns: [],
      count: 0
    };
  }

  loadDataFromProps(props){
    let count = 0;
    let datasrc = props.data.map(e => {
      count++;
      let time = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      }).format(e.timestamp*1000);
      return {
        key: e["id"],
        index: count,
        time: time,
        ...e
      };
    });
    this.setState({
      dataSource: datasrc, count: count
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

  render() {
    const { dataSource } = this.state;
    console.log(dataSource, "dataSource");

    return (
      <div>
        <Title level={4}>Count: {this.state.count}</Title>
        <Table
          dataSource={dataSource}
          columns={this.state.columns}
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TableEvent);