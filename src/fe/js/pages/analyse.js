import React from 'react';
import ReactDOM from 'react-dom';
import { Layout } from 'antd';
import axios from "axios/index";
import "antd/dist/antd.css";

import Header from  '../components/header/header';
import Navigator from  '../components/navigator/navigator';
import AnalyseForm from '../components/analyseForm/analyseForm';
import AnalyseRes from '../components/analyseRes/analyseRes';


class App extends React.Component {

    componentDidUpdate() {

    }

    handleSubmit = (formObj) => {

        console.log('handleSubmit');
        formObj.validateFields((err, fieldsValue) => {

            if (err) {
                return;
            }

            let {strategy, long_or_short, day_of_week, date_range, time_range1,
                time_range2, time_range3, time_range4, time_range5, time_range6,
                time_range7, time_range8, time_range9, time_range10} = fieldsValue;


            let date_rangeArr;
            let time_ranges = [];

            if (date_range) {
                date_rangeArr = [date_range[0].format('YYYY-MM-DD'), date_range[1].format('YYYY-MM-DD')];
            }

            if (time_range1 && time_range2) {
                time_ranges.push([time_range1.format('HH:mm'), time_range2.format('HH:mm')]);
            }

            if (time_range3 && time_range4) {
                time_ranges.push([time_range3.format('HH:mm'), time_range4.format('HH:mm')]);
            }

            if (time_range5 && time_range6) {
                time_ranges.push([time_range5.format('HH:mm'), time_range6.format('HH:mm')]);
            }

            if (time_range7 && time_range8) {
                time_ranges.push([time_range7.format('HH:mm'), time_range8.format('HH:mm')]);
            }

            if (time_range9 && time_range10) {
                time_ranges.push([time_range9.format('HH:mm'), time_range10.format('HH:mm')]);
            }

            //strategy  long or short  day of week  date range  time period1  time period2  time period3

            let data = {
                strategy,
                long_or_short,
                day_of_week,
                date_range: date_rangeArr || '',
                time_ranges: time_ranges.length > 0 ? time_ranges : ''
            };

            axios.post('/api/analyseTrade', data,
                {
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
                .then((response) => {
                    console.log(response.data);
                    console.log(response.data.data);

                    this.setState({
                        analyseRes: response.data.data
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            analyseRes: {
                '09:30-10:30': {
                    analyseRes: {
                        key: 1,
                        totalNum: 100,
                        win: 40,
                        lose: 60,
                        totalProfit: 1000,
                        rate: 40
                    },
                    trades: [
                        {
                            key: '1',
                            symbol: 'AA',
                            long_short: 'short',
                            profit: -14.14,
                            entry_time: '2018-04-23 09:35:35',
                            entry_qty: -100,
                            entry_price: 54.07,
                            exit_time: '2018-04-23 09:37:30',
                            exit_qty: 100,
                            exit_price: 54.19,
                            fees: -2.14
                        }
                    ]
                },
                '10:31-11:00': {
                    analyseRes: {
                        key: 2,
                        totalNum: 100,
                        win: 40,
                        lose: 60,
                        totalProfit: 1000,
                        rate: 40
                    },
                    trades: [
                        {
                            key: '1',
                            symbol: 'AA',
                            long_short: 'short',
                            profit: -14.14,
                            entry_time: '2018-04-23 09:35:35',
                            entry_qty: -100,
                            entry_price: 54.07,
                            exit_time: '2018-04-23 09:37:30',
                            exit_qty: 100,
                            exit_price: 54.19,
                            fees: -2.14
                        }
                    ]
                }
            }
        };
    }

    render () {
        return (
            <Layout style={{paddingBottom: '50px'}}>
                <Header />
                <Layout>
                    <Navigator target={'index'} />
                    <Layout style={{ paddingLeft: '5px' }}>
                        <AnalyseForm onHandleSubmit={this.handleSubmit} />
                        <AnalyseRes analyseData={this.state.analyseRes}/>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));


/*

const columns = [{
    title: 'symbol',
    dataIndex: 'symbol',
    key: 'symbol'
}, {
    title: 'long_short',
    dataIndex: 'long_short',
    key: 'long_short'
}, {
    title: 'profit',
    dataIndex: 'profit',
    key: 'profit'
}, {
    title: 'entry_time',
    dataIndex: 'entry_time',
    key: 'entry_time'
}, {
    title: 'entry_qty',
    dataIndex: 'entry_qty',
    key: 'entry_qty'
}, {
    title: 'entry_price',
    dataIndex: 'entry_price',
    key: 'entry_price'
},, {
    title: 'exit_time',
    dataIndex: 'exit_time',
    key: 'exit_time'
}, {
    title: 'exit_qty',
    dataIndex: 'exit_qty',
    key: 'exit_qty'
}, {
    title: 'exit_price',
    dataIndex: 'exit_price',
    key: 'exit_price'
},{
    title: 'fees',
    dataIndex: 'fees',
    key: 'fees'
}];

const data = [{
    key: '1',
    symbol: 'AA',
    long_short: 'short',
    profit: -14.14,
    entry_time: '2018-04-23 09:35:35',
    entry_qty: -100,
    entry_price: 54.07,
    exit_time: '2018-04-23 09:37:30',
    exit_qty: 100,
    exit_price: 54.19,
    fees: -2.14
}, {
    key: '2',
    symbol: 'AA',
    long_short: 'short',
    profit: -14.14,
    entry_time: '2018-04-23 09:35:35',
    entry_qty: -100,
    entry_price: 54.07,
    exit_time: '2018-04-23 09:37:30',
    exit_qty: 100,
    exit_price: 54.19,
    fees: -2.14
}];

class App extends React.Component {

    componentDidUpdate() {

    }

    constructor(props) {
        super(props);
        this.state = {
            analyseRes: {
                '09:30-10:30': {
                    analyseRes: {
                        total_num: 100,
                        win_num: 40,
                        lose_num: 60,
                        total_profit: 1000,
                        win_rate: 40
                    },
                    trades: [
                        {
                            key: '1',
                            symbol: 'AA',
                            long_short: 'short',
                            profit: -14.14,
                            entry_time: '2018-04-23 09:35:35',
                            entry_qty: -100,
                            entry_price: 54.07,
                            exit_time: '2018-04-23 09:37:30',
                            exit_qty: 100,
                            exit_price: 54.19,
                            fees: -2.14
                        }
                    ]
                },
                '10:31-11:00': {
                    analyseRes: {
                        total_num: 100,
                        win_num: 40,
                        lose_num: 60,
                        total_profit: 1000,
                        win_rate: 40
                    },
                    trades: [
                        {
                            key: '1',
                            symbol: 'AA',
                            long_short: 'short',
                            profit: -14.14,
                            entry_time: '2018-04-23 09:35:35',
                            entry_qty: -100,
                            entry_price: 54.07,
                            exit_time: '2018-04-23 09:37:30',
                            exit_qty: 100,
                            exit_price: 54.19,
                            fees: -2.14
                        }
                    ]
                }
            }
        };
    }

    render () {
        return (
            <Layout>
            <Header />
            <Layout>
                <Navigator target={'index'} />
                <Layout style={{ padding: '0 24px 24px' }}>
                    <WrappedTimeRelatedForm />
                    {Object.keys(this.state.analyseRes).map((key) => {
                        return (
                            <div>
                                <div>{key}</div>
                                <Table columns={analyseResColumns} dataSource={analyseResData} />
                            </div>
                        )
                    })}
                    <Table columns={columns} dataSource={data} />
                </Layout>
            </Layout>
        </Layout>
        )
    }
}

const analyseResColumns = [{
    title: 'total_num',
    dataIndex: 'total_num',
    key: 'total_num'
}, {
    title: 'win_num',
    dataIndex: 'win_num',
    key: 'win_num'
}, {
    title: 'lose_num',
    dataIndex: 'lose_num',
    key: 'lose_num'
}, {
    title: 'total_profit',
    dataIndex: 'total_profit',
    key: 'total_profit'
}, {
    title: 'win_rate',
    dataIndex: 'win_rate',
    key: 'win_rate'
}];

const analyseResData = [{
    total_num: 100,
    win_num: 40,
    lose_num: 60,
    total_profit: 1000,
    win_rate: 40
}];

ReactDOM.render(
    <App />
    , document.getElementById('root'));

    */




