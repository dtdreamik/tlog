import React from "react";
import { Layout, Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const { Sider } = Layout;

class Index extends React.Component {

    constructor(props) {
        super(props);
        this.goTo = this.goTo.bind(this);
    }

    goTo(page) {
        return function() {
            window.location.href = `/page/${page}.html`;
        }
    }

    render() {
        return (
            <Sider width={200} style={{ background: '#fff' }}>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={[this.props.target]}
                    defaultOpenKeys={['tradeLog', 'analysis', 'myInfo']}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    <SubMenu key="tradeLog" title={<span><Icon type="user" />TradeLog</span>}>
                        <Menu.Item key="index" onClick = {this.goTo('index')}>stocks</Menu.Item>
                        <Menu.Item key="add" onClick = {this.goTo('add')}>add</Menu.Item>
                    </SubMenu>
                    <SubMenu key="analysis" title={<span><Icon type="laptop" />Analysis</span>}>
                        <Menu.Item key="5" onClick = {this.goTo('analyse')}>normal</Menu.Item>
                        <Menu.Item key="5" onClick = {this.goTo('custom')}>custom</Menu.Item>
                    </SubMenu>
                    <SubMenu key="chartLib" title={<span><Icon type="laptop" />chartLib</span>}>
                        <Menu.Item key="5" onClick = {this.goTo('addchart')}>add</Menu.Item>
                        <Menu.Item key="5" onClick = {this.goTo('querychart')}>query</Menu.Item>
                    </SubMenu>
                    <SubMenu key="myInfo" title={<span><Icon type="notification" />MyInfo</span>}>
                        <Menu.Item key="9">accounts</Menu.Item>
                        <Menu.Item key="10">calendar</Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        );
    }
}

export default Index;