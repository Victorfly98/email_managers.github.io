import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    SendOutlined,
    MailOutlined,
    ToolOutlined,
    HomeOutlined,
} from '@ant-design/icons';
import '../css/Menu.css'
import ExcelReader from './screen/ExcelReader';
import FillterMail from './screen/FillterMail';
import EmailMonitoring from './screen/EmailMonitoring';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class RouterApp extends Component {

    state = {
        collapsed: false,
    };

    onCollapse = (collapsed) => {
        this.setState({ collapsed });
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        return (
            <Router>
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider trigger={null} collapsible collapsed={this.state.collapsed} style={{ textAlign: 'start' }}>
                        <div className="logo">
                            {this.state.collapsed ? (
                                <div>
                                    <h3>
                                        <Link to="/">
                                            <HomeOutlined style={{width: 50, height: 50}} />
                                        </Link>
                                    </h3>
                                </div>
                            ) : (
                                <h3>
                                    <Link to="/">
                                        <div>
                                            <img src='https://image.shutterstock.com/image-photo/beautiful-water-drop-on-dandelion-260nw-789676552.jpg' style={{width: '100%', height: 50}}></img>
                                        </div>
                                        {/* {siteConfig.siteName} */}
                                    </Link>
                                </h3>
                            )}
                        </div>
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                            <Menu.Item key="1">
                                <SendOutlined />
                                <span>Send Mail</span>
                                <Link to="/ExcelReader" />
                            </Menu.Item>
                            <Menu.Item key="2">
                                <MailOutlined />
                                <span>Fillter Email</span>
                                <Link to="/FillterEmail" />
                            </Menu.Item>
                            <Menu.Item key="3">
                                <ToolOutlined />
                                <span>Email Monitoring</span>
                                <Link to="/EmailMonitoring" />
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        <div style={{ background: '#fff' }}>
                            <Header className="site-layout-background" style={{
                                justifyContent: 'space-between',
                                display: 'flex',
                                WebkitBoxPack: 'justify',
                                alignItems: 'center',
                                background: '#fff'
                            }}>
                            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                className: 'trigger',
                                onClick: this.toggle,
                            })}
                            
                            <img src='https://reactjs.org/logo-og.png' style={{ width: 50, height: 50, borderRadius: 25 }}></img>

                            </Header>
                        </div>
                        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                            <Route exact path="/ExcelReader" component={ExcelReader} />
                            <Route exact path="/FillterEmail" component={FillterMail} />
                            <Route exact path="/EmailMonitoring" component={EmailMonitoring} />
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                            Ant Design ©2016 Created by Ant UED
                        </Footer>
                    </Layout>

                </Layout>
            </Router>
        );
    }
}

export default RouterApp;