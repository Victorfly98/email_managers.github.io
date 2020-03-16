import React, { Component } from "react";
import { connect } from "react-redux";
import { Tabs, Typography, Input } from "antd";
import TableMonitor from "../item/TableMonitor";
import getAction from "../../redux/action";

const { Title } = Typography;
const { Search } = Input;
const { TabPane } = Tabs;

class EmailMonitoring extends Component {
  componentDidMount = () => {
    this.props.getMonitorEmail();
  };

  render() {
    //    console.log(this.props.monitor.monitorEmail)
    return (
      <div>
        <Title level={3}>EMAIL MONITORING</Title>
        <Search
          placeholder="Seach for recipient"
          onSearch={value => console.log(value)}
          style={{ width: 200 }}
        />
        <Tabs defaultActiveKey="bounces">
          <TabPane tab="Bounces" key="bounces">
            <TableMonitor
              {...[this.props.monitor.monitorEmail]}
              type="0"
            ></TableMonitor>
          </TabPane>
          <TabPane tab="Complaints" key="complaint">
            <TableMonitor
              {...[this.props.monitor.monitorEmail]}
              type="1"
            ></TableMonitor>
          </TabPane>
          <TabPane tab="Unsubscribes" key="unsub"></TabPane>
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