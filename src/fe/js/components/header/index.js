import React from "react";
import { Layout } from 'antd';
const { Header : AntdHeader } = Layout;

class Index extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <AntdHeader className="header">
                <div className="logo" />
            </AntdHeader>
        );
    }
}

export default Index;