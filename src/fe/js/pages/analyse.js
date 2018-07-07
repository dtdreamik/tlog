import '../../css/pages/analyse.css';
import axios from 'axios';
import { Form, DatePicker, Row, Col, TimePicker, Button, Select } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;

class TimeRelatedForm extends React.Component {

    constructor() {
        super();
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, fieldsValue) => {

            if (err) {
                return;
            }

            //strategy  long or short  day of week  date range  time period1  time period2  time period3
            let data = {
                strategy: 1,
                long_short: '',
                day_of_week: 1,
                date_range: ['2018-7-2 18:00', ''],
                time_ranges: [
                    ['09:30', '10:30'],
                    ['10:31', '11:30']
                ]
            };

            axios.post('/analyseTrade', data,
                {
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
                .then(function (response) {

                    this.setState(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });

            /*
                {
                    strategy: strategy,
                    long_short: long_short,
                    day_of_week: 1,
                    date_range: ['2018-7-2 18:00', ''],
                    time_ranges: [
                        ['']
                    ]
                }
            /*
            // Should format date value before submit.
            const rangeValue = fieldsValue['range-picker'];
            const rangeTimeValue = fieldsValue['range-time-picker'];
            const values = {
                ...fieldsValue,
                'date-picker': fieldsValue['date-picker'].format('YYYY-MM-DD'),
                'date-time-picker': fieldsValue['date-time-picker'].format('YYYY-MM-DD HH:mm:ss'),
                'month-picker': fieldsValue['month-picker'].format('YYYY-MM'),
                'range-picker': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
                'range-time-picker': [
                    rangeTimeValue[0].format('YYYY-MM-DD HH:mm:ss'),
                    rangeTimeValue[1].format('YYYY-MM-DD HH:mm:ss'),
                ],
                'time-picker': fieldsValue['time-picker'].format('HH:mm:ss'),
            };
            ;console.log('Received values of form: ', values)
            */
            console.log('Received values of form: ', fieldsValue)
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const config = {
            rules: [{ type: 'object', required: false, message: 'Please select time!' }],
        };
        const rangeConfig = {
            rules: [{ type: 'array', required: false, message: 'Please select time!' }],
        };

        const format = 'HH:mm';

        return (
            <Form onSubmit={this.handleSubmit} className = "analyseForm">
                <Row gutter={24}>
                    <Col span={5}>
                        <FormItem label="strategy" {...formItemLayout}>
                            {getFieldDecorator('strategy', {
                                initialValue: 'all'
                            })(
                                <Select style={{ width: 180 }} >
                                    <Option value="">all</Option>
                                    <Option value="jack">opening range short</Option>
                                    <Option value="lucy">flat top break</Option>
                                    <Option value="Yiminghe">pull back long</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={4}>
                        <FormItem label="long or short" {...formItemLayout}>
                            {getFieldDecorator('long-or-short', {
                                initialValue: 'all'
                            })(
                                <Select style={{ width: 80 }} >
                                    <Option value="">all</Option>
                                    <Option value="1">long</Option>
                                    <Option value="2">short</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={4}>
                        <FormItem label="day of week" {...formItemLayout}>
                            {getFieldDecorator('day-of-week', {
                                initialValue: 'all'
                            })(
                                <Select style={{ width: 60 }} >
                                    <Option value="">all</Option>
                                    <Option value="1">1</Option>
                                    <Option value="2">2</Option>
                                    <Option value="3" >3</Option>
                                    <Option value="4">4</Option>
                                    <Option value="5">5</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span = {5}>
                        <FormItem
                            {...formItemLayout}
                            label="date range"
                        >
                            {getFieldDecorator('range-picker')(
                                <RangePicker />
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span = {8}>
                        <FormItem label="time range" {...formItemLayout}>
                            <Row>
                                <Col>
                                    {getFieldDecorator('time-picker1')(
                                        <TimePicker format={format}/>
                                    )}
                                    -----
                                    {getFieldDecorator('time-picker2')(
                                        <TimePicker format={format}/>
                                    )}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {getFieldDecorator('time-picker3')(
                                        <TimePicker format={format}/>
                                    )}
                                    -----
                                    {getFieldDecorator('time-picker4')(
                                        <TimePicker format={format}/>
                                    )}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {getFieldDecorator('time-picker5')(
                                        <TimePicker format={format}/>
                                    )}
                                    -----
                                    {getFieldDecorator('time-picker6')(
                                        <TimePicker format={format}/>
                                    )}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {getFieldDecorator('time-picker7')(
                                        <TimePicker format={format}/>
                                    )}
                                    -----
                                    {getFieldDecorator('time-picker8')(
                                        <TimePicker format={format}/>
                                    )}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {getFieldDecorator('time-picker9')(
                                        <TimePicker format={format}/>
                                    )}
                                    -----
                                    {getFieldDecorator('time-picker10')(
                                        <TimePicker format={format}/>
                                    )}
                                </Col>
                            </Row>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <FormItem
                        wrapperCol={{
                            xs: { span: 24, offset: 0 },
                            sm: { span: 16, offset: 8 },
                        }}
                    >
                        <Button type="primary" htmlType="submit">Search</Button>
                    </FormItem>
                </Row>
            </Form>
        );
    }
}

const WrappedTimeRelatedForm = Form.create()(TimeRelatedForm);


import { Layout, Table, Icon, Divider } from 'antd';
import Header from  '../components/header/header';
import Navigator from  '../components/navigator/navigator';
import React from 'react';
import ReactDOM from 'react-dom';


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




