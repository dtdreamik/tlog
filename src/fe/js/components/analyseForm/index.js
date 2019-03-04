import React from "react";
import { Form, Row, Col, Button, Select, DatePicker, TimePicker } from 'antd';

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
                        <FormItem label="strategy" {...formItemLayout}>
                            {getFieldDecorator('strategy', {
                                initialValue: ''
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
                    <Col span={8}>
                        <FormItem label="long or short" {...formItemLayout}>
                            {getFieldDecorator('long_or_short', {
                                initialValue: ''
                            })(
                                <Select style={{ width: 80 }} >
                                    <Option value="">all</Option>
                                    <Option value="1">long</Option>
                                    <Option value="2">short</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="day of week" {...formItemLayout}>
                            {getFieldDecorator('day_of_week', {
                                initialValue: ''
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
                <Row type="flex" justify="start">
                    <Col span = {8}>
                        <FormItem label="time range" {...formItemLayout} style={{ width: '440px' }}>
                            <Row type="flex" justify="start">
                                <Col>
                                    {getFieldDecorator('time_range1')(
                                        <TimePicker format={format}/>
                                    )}
                                    -----
                                    {getFieldDecorator('time_range2')(
                                        <TimePicker format={format}/>
                                    )}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {getFieldDecorator('time_range3')(
                                        <TimePicker format={format}/>
                                    )}
                                    -----
                                    {getFieldDecorator('time_range4')(
                                        <TimePicker format={format}/>
                                    )}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {getFieldDecorator('time_range5')(
                                        <TimePicker format={format}/>
                                    )}
                                    -----
                                    {getFieldDecorator('time_range6')(
                                        <TimePicker format={format}/>
                                    )}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {getFieldDecorator('time_range7')(
                                        <TimePicker format={format}/>
                                    )}
                                    -----
                                    {getFieldDecorator('time_range8')(
                                        <TimePicker format={format}/>
                                    )}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {getFieldDecorator('time_range9')(
                                        <TimePicker format={format}/>
                                    )}
                                    -----
                                    {getFieldDecorator('time_range10')(
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

export default Form.create()(Index);