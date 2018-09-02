 import { Layout } from 'antd';
 import Header from  '../components/header/header';
 import Navigator from  '../components/navigator/navigator';
import React from 'react';
import ReactDOM from 'react-dom';

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