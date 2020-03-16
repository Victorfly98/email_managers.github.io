import React, { Component } from 'react'

import { connect } from 'react-redux'
import { Tabs } from 'antd';
import TableMonitor from '../item/TableMonitor'
import getAction from "../../redux/action";

const { TabPane } = Tabs;

class EmailMonitoring extends Component {
    
    componentDidMount = () => {
        this.props.getMonitorEmail()
    }

    render() {
    //    console.log(this.props.monitor.monitorEmail)
        return (
            <Tabs defaultActiveKey="1">
                <TabPane tab="Tab 1" key="1">
                    <TableMonitor {...[this.props.monitor.monitorEmail]} type = '0'></TableMonitor>
                </TabPane>
                <TabPane tab="Tab 2" key="2">
                    <TableMonitor {...[this.props.monitor.monitorEmail]} type = '1'></TableMonitor>
                </TabPane>
                <TabPane tab="Tab 3" key="3">
                    <TableMonitor></TableMonitor>
                </TabPane>
            </Tabs>
        )
    }
}

const mapStateToProps = state => {
    return {
        monitor: state.reducer
    }
}

const mapDispatchToProps = dispatch => {
    return {
       getMonitorEmail: () => {
           dispatch(getAction.action.getMonitorEmail())
       }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EmailMonitoring)
