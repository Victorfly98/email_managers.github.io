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
      searchText: "",
      searchColunm: "",
      datasrc: this.props.monitor.monitorEmail,
      datasrc1: this.props.monitor.monitorEmail1,
      datasrc2: this.props.monitor.monitorEmail2
    };
  }
  componentDidMount = () => {
    this.props.getMonitorEmail();
  };
  componentWillReceiveProps(nextprops) {
    if (nextprops.monitor !== this.props.monitor) {
      this.setState({
        datasrc: nextprops.monitor.monitorEmail,
        datasrc1: nextprops.monitor.monitorEmail1,
        datasrc2: nextprops.monitor.monitorEmail2
      });
    }
  }
  handleSearch = value => {
    const colunmkey = this.state.datasrc.filter(vl => {
      return vl.name.indexOf(value) !== -1;
    });
    this.setState({ datasrc: colunmkey });
  };

  render() {
    console.log(this.state.datasrc, "bbssbb");
    console.log(this.state.searchText, "vl");

    return (
      <div>
        <Title level={3}>EMAIL MONITORING</Title>
        <Search
          placeholder="Seach for recipient"
          onSearch={value => {
            console.log(value, ": value");
            this.handleSearch(value);
          }}
          // value={this.state.searchText}
          style={{ width: 200 }}
        />
        <Tabs defaultActiveKey="1">
          <TabPane tab="Bounces" key="1">
            <TableMonitor
              data={this.state.datasrc}
              // {...[this.state.datasrc]}
              type="0"
            ></TableMonitor>
          </TabPane>
          <TabPane tab="Complaints" key="2">
            <TableMonitor data={this.state.datasrc1} type="1"></TableMonitor>
          </TabPane>
          <TabPane tab="Unsubscribes" key="3">
            <TableMonitor data={this.state.datasrc2} type="2"></TableMonitor>
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
