
import { Form, Row, Col, Layout, Input, Button, DatePicker, Checkbox, Select } from 'antd';
import Header from  '../components/header';
import Navigator from  '../components/navigator';
import React from 'react';
import ReactDOM from 'react-dom';
import "antd/dist/antd.css";
import "../../css/reset.css";

import moment from "moment/moment";
import axios from 'axios';

const { TextArea } = Input;
const { Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;

class AddChartForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            entryStrategies: []
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

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, fieldsValue) => {

            if (err) {
                return;
            }
            //symbol path date notes  tags
            let {symbol, path, date, notes, tags, entryStrategies} = fieldsValue;


            let data = {
                symbol,
                notes,
                date: date.format('YYYY-MM-DD'),
                tags: tags,
                path,
                entryStrategies: entryStrategies
            };
            //debugger

            axios.post('/api/storeCharts', data,
                {
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
                .then((response) => {
                    this.setState(Object.assign(this.state,  response.data.data));
                })
                .catch(function (error) {
                    alert(error);
                });
        });

        return false;
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 }
            },
        };
        return (
            <Form onSubmit={this.handleSubmit} className = "analyseForm" style={{
                background: 'white',
                paddingTop: '20px'
            }}>
                <Form.Item
                    label="symbol"
                >
                    {getFieldDecorator('symbol', {
                        rules: [{ required: true, message: 'symbol 不能为空' }],
                    })(
                        <Input style={{
                            width: '200px'
                        }}/>
                    )}
                </Form.Item>

                <Form.Item
                    label="path"
                >
                    {getFieldDecorator('path', {
                        rules: [{ required: true, message: 'path 不能为空' }],
                    })(
                        <Input style={{
                            width: '200px'
                        }}/>
                    )}
                </Form.Item>

                <FormItem
                    {...formItemLayout}
                    label="date"
                >
                    {getFieldDecorator('date')(
                        <DatePicker/>
                    )}
                </FormItem>

                <FormItem label="entry strategies" {...formItemLayout}>
                    {getFieldDecorator('entryStrategies')(
                        <CheckboxGroup options={this.state.entryStrategies.map((item) => {
                            return {
                                label: item.name,
                                value: item.id
                            }
                        })}  />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="notes"
                >
                    {getFieldDecorator('notes')(
                        <TextArea rows={8} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="tags"
                >
                    {getFieldDecorator('tags')(
                        <CheckboxGroup options={this.state.tags}  />
                    )}
                </FormItem>

                    <FormItem
                        wrapperCol={{
                            xs: { span: 24, offset: 0 },
                            sm: { span: 16, offset: 8 },
                        }}
                    >
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </FormItem>
            </Form>
        );
    }
}

const AddChartFormlize = Form.create()(AddChartForm);

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    submit() {


    }

    render() {

      //  const { getFieldDecorator } = this.props.form;

        return (
            <Layout>
                <Header />
                <Layout>
                    <Navigator target={'add'}/>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <AddChartFormlize />
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));

