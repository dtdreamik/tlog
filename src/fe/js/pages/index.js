import React from 'react';
import ReactDOM from 'react-dom';
import { Layout } from 'antd';
import Header from  '../components/header';
import Navigator from  '../components/navigator';
import "antd/dist/antd.css";
import "../../css/reset.css";


ReactDOM.render(
    <Layout>
        <Header />
        <Layout>
            <Navigator target={'index'} />
            <Layout style={{ padding: '0 24px 24px' }}>
                    Content
            </Layout>
        </Layout>
    </Layout>
    , document.getElementById('root'));

