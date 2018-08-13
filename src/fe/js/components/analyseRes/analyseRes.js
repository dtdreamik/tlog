import React from "react";

class AnalyseRes extends React.Component {

    constructor() {
        super();
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
            <Form onSubmit={this.props.onHandleSubmit} className = "analyseForm">
                <Row gutter={24}>
                    <Col span={5}>
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
                    <Col span={4}>
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
                    <Col span={4}>
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
                    <Col span = {5}>
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
                    <Col span = {8}>
                        <FormItem label="time range" {...formItemLayout}>
                            <Row>
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

export default AnalyseForm;