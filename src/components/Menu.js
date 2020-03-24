/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Layout, Menu, Typography, Avatar } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SendOutlined,
  FilterOutlined,
  CloseSquareOutlined,
  HomeOutlined,
  EyeOutlined,
  MailOutlined,
  TeamOutlined
} from "@ant-design/icons";
import "../css/Menu.css";
import SendMail from "./screen/SendMail";
import FillterMail from "./screen/FillterMail";
import Suppressions from "./screen/Suppressions";
import Event from "./screen/Event";
import ListCustomer from "./screen/ListCustomer"
import avatar from "./../img/avatar.jpeg";
import logo from "./../img/logo11.png";
import Overview from "./screen/Overview";

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;
// const SubMenu = Menu.SubMenu;

class RouterApp extends Component {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    return (
      <Router>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
            style={{ textAlign: "start" }}
          >
            <div className="logo">
              {this.state.collapsed ? (
                <div>
                  <h3>
                    <Link to="/">
                      <HomeOutlined style={{ width: 50, height: 50 }} />
                    </Link>
                  </h3>
                </div>
              ) : (
                <h3>
                  <Link to="/">
                    <div className="logo">
                      <img src={logo} style={{ width: "100%", height: 50 }} />
                    </div>
                    {/* {siteConfig.siteName} */}
                  </Link>
                </h3>
              )}
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1">
                <EyeOutlined />
                <span>Overview</span>
                <Link to="/Overview" />
              </Menu.Item>
              <Menu.Item key="2">
                <SendOutlined />
                <span>Send Mail</span>
                <Link to="/SendMail" />
              </Menu.Item>
              <Menu.Item key="3">
                <FilterOutlined />
                <span>Fillter Email</span>
                <Link to="/FillterEmail" />
              </Menu.Item>
              <Menu.Item key="4">
                <CloseSquareOutlined />
                <span>Suppressions</span>
                <Link to="/Suppressions" />
              </Menu.Item>
              <Menu.Item key="5">
                <MailOutlined />
                <span>Event Email</span>
                <Link to="/Event" />
              </Menu.Item>
              <Menu.Item key="6">
                <TeamOutlined />
                <span>List Customer</span>
                <Link to="/ListCustomer" />
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <div style={{ background: "#fff" }}>
              <Header
                className="site-layout-background"
                style={{
                  justifyContent: "space-between",
                  display: "flex",
                  WebkitBoxPack: "justify",
                  alignItems: "center",
                  background: "#fff"
                }}
              >
                {React.createElement(
                  this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                  {
                    className: "trigger",
                    onClick: this.toggle
                  }
                )}
                <Title level={2}>MAIL MANAGER</Title>
                <Avatar size="large" src={avatar}></Avatar>
              </Header>
            </div>
            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                background: "#fff",
                minHeight: 280
              }}
            >
              <Route exact path="/SendMail" component={SendMail} />
              <Route exact path="/FillterEmail" component={FillterMail} />
              <Route exact path="/Overview" component={Overview} />
              <Route exact path="/" component={Overview} />
              <Route exact path="/Event" component={Event} />
              <Route exact path="/Suppressions" component={Suppressions} />
              <Route exact path="/ListCustomer" component={ListCustomer} />
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Mail Manager by Vinh Hau
            </Footer>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default RouterApp;
