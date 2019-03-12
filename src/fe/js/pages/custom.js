import React from 'react';
import ReactDOM from 'react-dom';
import { Layout } from 'antd';
import axios from "axios/index";
import "antd/dist/antd.css";
import "../../css/reset.css";

import Header from  '../components/header';
import Navigator from  '../components/navigator';
import AnalyseCustomForm from '../components/analyseCustomForm';
import AnalyseRes from '../components/analyseRes';


class App extends React.Component {

    componentDidUpdate() {

    }

    handleSubmit = (formObj) => {

        formObj.validateFields((err, fieldsValue) => {

            if (err) {
                return;
            }

            let {trade_times_start, trade_times_end, date_range} = fieldsValue;

            let date_rangeArr;

            if (date_range) {
                date_rangeArr = [date_range[0].format('YYYY-MM-DD'), date_range[1].format('YYYY-MM-DD')];
            }

            let data = {
                trade_times_start,
                trade_times_end,
                date_range: date_rangeArr || ''
            };

            axios.post('/api/customAnalyseTrade', data,
                {
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
                .then((response) => {

                    this.setState({
                        analyseRes: response.data.data
                    });
                })
                .catch(function (error) {
                    console.error(error);
                });
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            analyseRes: {}
        };
    }

    render () {
        return (
            <Layout style={{paddingBottom: '50px'}}>
                <Header />
                <Layout>
                    <Navigator target={'index'} />
                    <Layout style={{ paddingLeft: '5px' }}>
                        <AnalyseCustomForm onHandleSubmit={this.handleSubmit} />
                        <AnalyseRes analyseData={this.state.analyseRes}/>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

