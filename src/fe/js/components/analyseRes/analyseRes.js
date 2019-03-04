import React from "react";
import { Drawer, Table, Icon } from 'antd';
import "./analyseRes.css";

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

        this.state = {
            visible: false
        };
    }

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

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
                            <Table bordered ={true} pagination = {{position: 'none'}} pagination={{ pageSize: 5000 }}
                                   onRow={(record) => {
                                       return {
                                           onClick: (event) => {
                                               this.setState({
                                                   visible: true
                                               });
                                           }      // 点击行
                                       };
                                   }}
                                   columns={tradesColumns} dataSource={this.props.analyseData[key].trades} size="middle" />

                                <Drawer
                                    title="Trade Review"
                                    width={1000}
                                    onClose={this.onClose}
                                    visible={this.state.visible}
                                    style={{
                                        overflow: 'auto',
                                        height: 'calc(100% - 108px)',
                                        paddingBottom: '108px',
                                    }}
                                >
                                    <div
                                        style={{
                                            width: '100%'
                                        }}
                                    >
                                        <ul>
                                            <li>
                                                <div className="trade-review-col">symbol</div>
                                                <div className="trade-review-col">long_short</div>
                                                <div className="trade-review-col">profit</div>
                                            </li>
                                            <li>
                                                <div className="trade-review-col">jd</div>
                                                <div className="trade-review-col">long</div>
                                                <div className="trade-review-col">100</div>
                                            </li>
                                            <li>
                                                <div className="trade-review-col">entry</div>
                                                <div className="trade-review-col">exit</div>
                                            </li>
                                            <li>
                                                <div className="scale-in">
                                                    <div className="trade-review-col">entry_date</div>
                                                    <div className="trade-review-col">entry_qty</div>
                                                    <div className="trade-review-col">entry_price</div>
                                                </div>
                                                <div className="scale-in">
                                                    <div className="trade-review-col">exit_date</div>
                                                    <div className="trade-review-col">exit_qty</div>
                                                    <div className="trade-review-col">exit_price</div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="scale-in">
                                                    <div className="trade-review-col">2018-04-02 09:30</div>
                                                    <div className="trade-review-col">100</div>
                                                    <div className="trade-review-col">50</div>
                                                    <div className="trade-review-col">2018-04-02 09:30</div>
                                                    <div className="trade-review-col">100</div>
                                                    <div className="trade-review-col">40</div>
                                                </div>
                                                <div className="scale-out">
                                                    <div className="trade-review-col">2018-04-02 09:30</div>
                                                    <div className="trade-review-col">100</div>
                                                    <div className="trade-review-col">50</div>
                                                    <div className="trade-review-col">2018-04-02 09:30</div>
                                                    <div className="trade-review-col">100</div>
                                                    <div className="trade-review-col">40</div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="trade-review-col">stop price</div>
                                                <div className="trade-review-col">target price</div>
                                            </li>
                                            <li>
                                                <div className="trade-review-col">
                                                    40
                                                    <span className="edit-ico"><Icon type="edit" /></span>

                                                </div>
                                                <div className="trade-review-col">50<Icon type="edit" /></div>
                                            </li>
                                            <li>
                                                <div className="trade-review-col">notes</div>
                                            </li>
                                            <li>
                                                <div className="trade-review-col">notes<Icon type="edit" /></div>
                                            </li>
                                            <li>
                                                <div className="trade-review-col">trade img</div>
                                            </li>
                                            <li>
                                                <div className="trade-review-col">trade img<Icon type="edit" /></div>
                                            </li>
                                        </ul>
                                    </div>
                                </Drawer>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

export default AnalyseRes;