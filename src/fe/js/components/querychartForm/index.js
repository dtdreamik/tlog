import React from "react";
import { Form, Row, Col, Button, Select, DatePicker, TimePicker, Input, Checkbox } from 'antd';
import moment from 'moment';

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
const CheckboxGroup = Checkbox.Group;

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
                <FormItem label="symbol" {...formItemLayout}>
                    {getFieldDecorator('symbol', {
                        initialValue: ''
                    })(
                        <Input style={{
                            width: '200px'
                        }}/>
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="date range"
                >
                    {getFieldDecorator('date_range')(
                        <RangePicker />
                    )}
                </FormItem>

                <FormItem label="strategy" {...formItemLayout}>
                    {getFieldDecorator('strategy', {
                        initialValue: ''
                    })(
                        <Select style={{ width: 380 }} >
                            <Option value="">all</Option>
                            {
                                this.props.entryStrategies.map((item) => {
                                    return (<Option value={item.id}>{item.name}</Option>);
                                })
                            }
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="tags"
                >
                    {getFieldDecorator('tags')(
                        <CheckboxGroup options={this.props.tags}  />
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

export default Form.create()(Index);