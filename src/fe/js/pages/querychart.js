import React from 'react';
import ReactDOM from 'react-dom';
import { Layout } from 'antd';
import axios from "axios/index";
import "antd/dist/antd.css";
import "../../css/reset.css";

import Header from  '../components/header';
import Navigator from  '../components/navigator';
import QuerychartForm from '../components/querychartForm';
import QuerychartRes from '../components/querychartRes';


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chartquertRes: [],
            entryStrategies: [],
            tags: []
        };
    }

    componentDidMount() {

        Promise.all([axios.post('/api/getTags', {},
            {
                headers: {
                    'Content-type': 'application/json'
                }
            }), axios.post('/api/getStrategies', {},
            {
                headers: {
                    'Content-type': 'application/json'
                }
            })])

            .then((vals) => {

                this.setState(Object.assign(this.state, {
                    tags: vals[0].data.data.map((tag) => {
                        return {
                            label: tag.name,
                            value: tag.id
                        }
                    }),
                    entryStrategies: vals[1].data.data.entryStrategies
                }));
            })
            .catch(function (error) {
                alert(error);
            });

    }

    componentDidUpdate() {

    }

    handleSubmit = (formObj) => {

        formObj.validateFields((err, fieldsValue) => {
            if (err) {
                return;
            }

            let {symbol, date_range, strategy, tags} = fieldsValue;


            let date_rangeArr;

            if (date_range && date_range.length > 0) {
                date_rangeArr = [date_range[0].format('YYYY-MM-DD'), date_range[1].format('YYYY-MM-DD')];
            }

            let data = {
                symbol,
                strategy,
                date_range: date_rangeArr || '',
                tags: tags || ''
            };

            axios.post('/api/queryCharts', data,
                {
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
                .then((response) => {
                    this.setState(Object.assign(this.state,  {
                        chartquertRes: response.data.data
                    }));
                })
                .catch(function (error) {
                    console.error(error);
                });
        });
    }

    render () {
        return (
            <Layout style={{paddingBottom: '50px'}}>
                <Header />
                <Layout>
                    <Navigator target={'index'} />
                    <Layout style={{ paddingLeft: '5px' }}>
                        <QuerychartForm onHandleSubmit={this.handleSubmit}
                                     entryStrategies={this.state.entryStrategies}
                                     tags={this.state.tags}/>
                        <QuerychartRes charts={this.state.chartquertRes}/>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

