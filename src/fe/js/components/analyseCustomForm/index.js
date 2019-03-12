import React from "react";
import { Form, Row, Col, Button, Select, DatePicker, TimePicker } from 'antd';
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

class Index extends React.Component {

    constructor() {
        super();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onHandleSubmit(this.props.form);
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
        const config = {
            rules: [{ type: 'object', required: false, message: 'Please select time!' }],
        };
        const rangeConfig = {
            rules: [{ type: 'array', required: false, message: 'Please select time!' }],
        };

        const format = 'HH:mm';

        return (
            <Form onSubmit={this.handleSubmit} className = "analyseForm" style={{
                background: 'white',
                paddingTop: '20px'
            }}>
                <Row gutter={24}>
                    <Col span={8}>
                        <FormItem label="trade times" {...formItemLayout}>
                            {getFieldDecorator('trade_times_start', {
                                initialValue: ''
                            })(
                                <Select style={{ width: 180 }} >
                                    <Option value="1">1</Option>
                                    <Option value="2">2</Option>
                                    <Option value="3">3</Option>
                                    <Option value="4">4</Option>
                                    <Option value="5">5</Option>
                                    <Option value="6">6</Option>
                                    <Option value="7">7</Option>
                                    <Option value="8">8</Option>
                                    <Option value="9">9</Option>
                                    <Option value="10">10</Option>
                                    <Option value="11">11</Option>
                                    <Option value="12">12</Option>
                                </Select>
                            )}
                            {getFieldDecorator('trade_times_end', {
                                initialValue: ''
                            })(
                                <Select style={{ width: 180 }} >
                                    <Option value="1">1</Option>
                                    <Option value="2">2</Option>
                                    <Option value="3">3</Option>
                                    <Option value="4">4</Option>
                                    <Option value="5">5</Option>
                                    <Option value="6">6</Option>
                                    <Option value="7">7</Option>
                                    <Option value="8">8</Option>
                                    <Option value="9">9</Option>
                                    <Option value="10">10</Option>
                                    <Option value="11">11</Option>
                                    <Option value="12">12</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span = {8}>
                        <FormItem
                            {...formItemLayout}
                            label="date range"
                        >
                            {getFieldDecorator('date_range')(
                                <RangePicker />
                            )}
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

export default Form.create()(Index);