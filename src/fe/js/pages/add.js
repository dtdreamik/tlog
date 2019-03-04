
import { Layout, Input, Button } from 'antd';
import Header from  '../components/header';
import Navigator from  '../components/navigator';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import "antd/dist/antd.css";
import "../../css/reset.css";

const { TextArea } = Input;
const { Content } = Layout;

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tradeHTML: '',
        };

        this.submit = this.submit.bind(this);
    }

    submit() {

        if (!this.state.tradeHTML) {
            return;
        }

        axios.post('/api/storeTrade', {
                tradeHTML: this.state.tradeHTML
            },
            {
                headers: {
                    'Content-type': 'application/json'
                }
            })
            .then(function (response) {
                alert('添加成功');
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <Layout>
                <Header />
                <Layout>
                    <Navigator target={'add'}/>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                            <TextArea rows={8} onInput={(event) => this.setState({
                                tradeHTML: event.target.value
                            })}/>
                            <Button type="primary" onClick={this.submit} style={{ float: 'right', marginTop: 5}}>submit</Button>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

