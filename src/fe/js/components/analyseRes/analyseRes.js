import React from "react";
import { Table } from 'antd';

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


const data = [{
    key: '1',
    totalNum: 100,
    win: 32,
    lose: 68,
    totalProfit: 1000,
    rate: 32
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

const tradesData = [{
    symbol: 'jd',
    long_short: 'long',
    profit: 1000,
    entry_time: '',
    exit_time: '',
    entry_qty: 100,
    entry_price: 100,
    exit_price: 100,
    exit_qty: 100,
    fees: 2,
    stop_price:99,
    target_price: 101
}];


class AnalyseRes extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        //total num    win    lose    total profit       rate
        return (
            <div style={{
                background: 'white',
                marginTop: '10px',
                paddingLeft: '10px'
            }}>
                {
                    Object.keys(this.props.analyseData).map((key) => {
                        console.log('for');
                        console.log('trades length ' + this.props.analyseData[key].trades.length);
                        return (
                            <div>
                            <h1 style={{
                                textAlign: 'center'
                            }}>
                                {key}
                            </h1>
                            <Table bordered = {true} pagination = {{position: 'none'}} columns={analyseResColumns} dataSource={[this.props.analyseData[key].analyseRes]} size="middle" />
                            <Table bordered ={true} pagination = {{position: 'none'}} pagination={{ pageSize: 5000 }}  columns={tradesColumns} dataSource={this.props.analyseData[key].trades} size="middle" />
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

export default AnalyseRes;