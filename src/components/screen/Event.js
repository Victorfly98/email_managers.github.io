import React, { Component } from "react";
import { connect } from "react-redux";
import { Tabs, Typography, Input } from "antd";
import TableEvent from "../item/TableEvent";
import getAction from "../../redux/action";

const { Title } = Typography;
const { Search } = Input;
const { TabPane } = Tabs;

class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataDelivered: [],
            dataFailedEmail: [],
            dataOpened: [],
            dataClicked: [],
            value: ""
        };
    }
    componentDidMount = () => {
        this.props.getEvent()
    };
    componentWillReceiveProps(nextprops) {
        if (nextprops.event !== this.props.event) {
            this.setState({
                dataDelivered: nextprops.event.deliver,
                dataFailedEmail: nextprops.event.failed,
                dataOpened: nextprops.event.opened,
                dataClicked: nextprops.event.clicked
            });
        }
    }
    render() {
        return (
            <div>
                <Title level={3}>EVENT</Title>
                <Search
                    placeholder="Seach for recipient"
                    onSearch={vl => {
                        this.setState({ value: vl });
                    }}
                    style={{ width: 200 }}
                />
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Delivered" key="1">
                        <TableEvent data={this.state.dataDelivered} type="0" search={this.state.value} ></TableEvent>
                    </TabPane>
                    <TabPane tab="Failed Email" key="2">
                        <TableEvent
                            data={this.state.dataFailedEmail}
                            type="1"
                            search={this.state.value}
                        ></TableEvent>
                    </TabPane>
                    <TabPane tab="Opened" key="3">
                        <TableEvent
                            data={this.state.dataOpened} type="2"
                            search={this.state.value}
                        ></TableEvent>
                    </TabPane>
                    <TabPane tab="Clicked" key="4">
                        <TableEvent
                            data={this.state.dataClicked} type="3"
                            search={this.state.value}
                        ></TableEvent>
                    </TabPane>
                    {/* <Title level={4}>Count: {this.state.count}</Title> */}
                </Tabs>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        event: state.reducer
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getEvent: () => {
            dispatch(getAction.action.getEvent());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Event);
