import React from "react";
import { Drawer, Table, Icon } from 'antd';
import TradingReview from '../tradingrReview';
import axios from "axios/index";

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

        document.addEventListener('keyup', (e)=> {
            if (event.keyCode === 27) {
                this.onClose();
            }
        }, false);
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
                                textAlign: 'center',
                                fontSize: '50px',
                                padding: '10px',
                                background: '#cec2c2'
                            }}>
                                {key}
                            </h1>
                            <Table bordered = {true} pagination = {{position: 'none'}} columns={analyseResColumns} dataSource={[this.props.analyseData[key].analyseRes]} size="middle" />
                            <Table bordered ={true} pagination = {{position: 'none'}} pagination={{ pageSize: 5000 }}
                                   onRow={(record) => {
                                       return {
                                           onClick: (event) => {
                                               console.log(JSON.stringify(record));
                                               this.setState({
                                                   visible: true,
                                                   record: record
                                               });
                                           }
                                       };
                                   }}
                                   columns={tradesColumns} dataSource={this.props.analyseData[key].trades} size="middle" />
                                <TradingReview
                                    updateStopPrice={(v) => {
                                        return this.updateStopPrice(v);
                                    }}
                                    updateTargetPrice={(v) => {
                                        return this.updateTargetPrice(v);
                                    }}
                                    updateTradeImg={(v) => {
                                        return this.updateTradeImg(v);
                                    }}
                                    updateNotes={(v) => {
                                        return this.updateNotes(v);
                                    }}
                                    updateNeedReview={(v) => {
                                        return this.updateNeedReview(v);
                                    }}
                                   onClose={() => this.onClose()} visible={this.state.visible} record={this.state.record}/>
                            </div>
                        )
                    })
                }
            </div>
        );
    }

    updateStopPrice(v) {
        return axios.post('/api/updateStopPriceById', {
                id: this.state.record.id,
                stopPrice: v
            },
            {
                headers: {
                    'Content-type': 'application/json'
                }
            })
            .then(() => {
                this.setState({
                    record: Object.assign(this.state.record, {
                        stop_price: v
                    })
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    updateTargetPrice(v) {
        return axios.post('/api/updateTargetPriceById', {
                id: this.state.record.id,
                targetPrice: v
            },
            {
                headers: {
                    'Content-type': 'application/json'
                }
            })
            .then(() => {
                this.setState({
                    record: Object.assign(this.state.record, {
                        target_price: v
                    })
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    updateTradeImg(v) {
        return axios.post('/api/updateTradeImgById', {
                id: this.state.record.id,
                tradeImg: v
            },
            {
                headers: {
                    'Content-type': 'application/json'
                }
            })
            .then(() => {
                this.setState({
                    record: Object.assign(this.state.record, {
                        trade_img: v
                    })
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    updateNotes(v) {
        return axios.post('/api/updateNotesById', {
                id: this.state.record.id,
                notes: v
            },
            {
                headers: {
                    'Content-type': 'application/json'
                }
            })
            .then(() => {
                this.setState({
                    record: Object.assign(this.state.record, {
                        notes: v
                    })
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    updateNeedReview(v) {
        return axios.post('/api/updateNeedReviewById', {
                id: this.state.record.id,
                needReview: v
            },
            {
                headers: {
                    'Content-type': 'application/json'
                }
            })
            .then(() => {
                this.setState({
                    record: Object.assign(this.state.record, {
                        need_review: v
                    })
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

}

export default Index;