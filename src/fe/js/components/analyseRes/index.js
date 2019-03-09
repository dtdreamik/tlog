import React from "react";
import { Drawer, Table, Icon } from 'antd';
import TradingReview from '../tradingrReview';

const analyseResColumns = [{
    title: 'total num',
    dataIndex: 'totalNum',
}, {
    title: 'win',
    dataIndex: 'win',
}, {
    title: 'lose',
    dataIndex: 'lose',
}, {
    title: 'total profit',
    dataIndex: 'totalProfit',
}, {
    title: 'rate',
    dataIndex: 'rate',
}];

const tradesColumns = [{
    title: 'symbol',
    dataIndex: 'symbol',
}, {
    title: 'long_short',
    dataIndex: 'long_short',
}, {
    title: 'profit',
    dataIndex: 'profit',
    sorter: (a, b) => a.profit - b.profit
}, {
    title: 'entry_time',
    dataIndex: 'entry_time',
    sorter: (a, b) => new Date(a.entry_time) - new Date(b.entry_time)
}, {
    title: 'exit_time',
    dataIndex: 'exit_time',
}, {
    title: 'entry_qty',
    dataIndex: 'entry_qty',
}, {
    title: 'entry_price',
    dataIndex: 'entry_price',
}, {
    title: 'exit_price',
    dataIndex: 'exit_price',
}, {
    title: 'exit_qty',
    dataIndex: 'exit_qty',
}, {
    title: 'fees',
    dataIndex: 'fees',
}, {
    title: 'stop_price',
    dataIndex: 'stop_price',
}, {
    title: 'target_price',
    dataIndex: 'target_price',
}];

class Index extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            record: {}
        };
    }

    onClose = () => {
        this.setState({
            visible: false
        });
    };

    render() {
        return (
            <div style={{
                background: 'white',
                marginTop: '10px',
                paddingLeft: '10px'
            }}>
                {
                    Object.keys(this.props.analyseData).map((key) => {

                        return (
                            <div>
                            <h1 style={{
                                textAlign: 'center'
                            }}>
                                {key}
                            </h1>
                            <Table bordered = {true} pagination = {{position: 'none'}} columns={analyseResColumns} dataSource={[this.props.analyseData[key].analyseRes]} size="middle" />
                            <Table bordered ={true} pagination = {{position: 'none'}} pagination={{ pageSize: 5000 }}
                                   onRow={(record) => {
                                       return {
                                           onClick: (event) => {
                                               this.setState({
                                                   visible: true,
                                                   record: record
                                               });
                                           }
                                       };
                                   }}
                                   columns={tradesColumns} dataSource={this.props.analyseData[key].trades} size="middle" />
                                <TradingReview onClose={() => this.onClose()} visible={this.state.visible} record={this.state.record}/>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

export default Index;