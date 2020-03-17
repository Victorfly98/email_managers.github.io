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
    };
  }
  componentDidMount = () => {
    this.props.getMonitorEmail();
  };
  componentWillReceiveProps(nextprops){
    if(nextprops.monitor !== this.props.monitor){
      this.setState({datasrc: nextprops.monitor.monitorEmail} )
    }
  }
  handleSearch = (value) => {
    const colunmkey = this.state.datasrc.filter(
      vl =>{
        return vl.name.indexOf(value) !== -1
        
      }
    )
    console.log(colunmkey, "....");
    this.setState({datasrc : colunmkey});
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
            console.log(value, ': value');
            
            this.handleSearch(value);
          }}
          // value={this.state.searchText}
          style={{ width: 200 }}
        />
        <Tabs defaultActiveKey="bounces">
          <TabPane tab="Bounces" key="bounces">
            <TableMonitor
              {...[this.state.datasrc]}
              type="0"
            ></TableMonitor>
          </TabPane>
          <TabPane tab="Complaints" key="complaint">
            <TableMonitor
              {...[this.state.datasrc]}
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
