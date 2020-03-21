import React, { Component } from "react";
import { connect } from "react-redux";
import { Tabs, Typography, Input } from "antd";
import TableMonitor from "../item/TableMonitor";
import getAction from "../../redux/action";
import _ from "lodash";

const { Title } = Typography;
const { Search } = Input;
const { TabPane } = Tabs;

class EmailMonitoring extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataBounces: [],
      dataComplaint: [],
      dataUnsub: [],
      dataFiter: [],
      value: "",
    };
  }
  componentDidMount = () => {
    this.props.getMonitorEmail();
  };
  componentWillReceiveProps(nextprops) {
    if (nextprops.monitor !== this.props.monitor) {
      this.setState({
        dataBounces: nextprops.monitor.bouncesEmail,
        dataComplaint: nextprops.monitor.complaintEmail,
        dataUnsub: nextprops.monitor.unsubEmail
      });
    }
  }
  handleSearch = value => {
    const colunmkey = this.state.dataBounces.filter(vl => {
      return vl.address.indexOf(value) !== -1;
    });
    this.setState({ dataFiter: colunmkey });
    console.log(this.state.value, "value");
  };

  render() {
    console.log(this.state.dataFiter, "dataseach");
    console.log(this.state.value, "value");
    return (
      <div>
        <Title level={3}>EMAIL MONITORING</Title>
        <Search
          placeholder="Seach for recipient"
          onSearch={vl => {
            this.setState({ value: vl });
            console.log(vl, ": value");
            this.handleSearch(vl);
          }}
          // value={this.state.searchText}
          style={{ width: 200 }}
        />
        <Tabs defaultActiveKey="1">
          <TabPane tab="Bounces" key="1">
            {this.state.value === "" ? (
              <TableMonitor
                data={this.state.dataBounces}
                type="0"
              ></TableMonitor>
            ) : (
              <TableMonitor data={this.state.dataFiter} type="0"></TableMonitor>
            )}
          </TabPane>
          <TabPane tab="Complaints" key="2">
            <TableMonitor
              data={this.state.dataComplaint}
              type="1"
            ></TableMonitor>
          </TabPane>
          <TabPane tab="Unsubscribes" key="3">
            <TableMonitor data={this.state.dataUnsub} type="2"></TableMonitor>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    monitor: state.reducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getMonitorEmail: () => {
      dispatch(getAction.action.getMonitorEmail());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailMonitoring);
