import React from "react";
import { Drawer, Icon } from 'antd';
import "./styles.css";
import EditableEle from '../editableEle';
import axios from 'axios';

class Index extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            stopPrice: this.props.stopPrice,
            targetPrice: this.props.targetPrice,
            tradeImg: this.props.tradeImg,
            notes: this.props.notes
        };
    }

    updateStopPrice(v) {
        return axios.post('/api/updateStopPriceById', {
                id: this.props.record.id,
                stopPrice: v
            },
            {
                headers: {
                    'Content-type': 'application/json'
                }
            })
            .then(() => {
                this.setState({
                    stopPrice: v
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    updateTargetPrice(v) {
        return axios.post('/api/updateTargetPriceById', {
                id: this.props.record.id,
                targetPrice: v
            },
            {
                headers: {
                    'Content-type': 'application/json'
                }
            })
            .then(() => {
                this.setState({
                    targetPrice: v
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    updateTradeImg(v) {
        return axios.post('/api/updateTradeImgById', {
                id: this.props.record.id,
                tradeImg: v
            },
            {
                headers: {
                    'Content-type': 'application/json'
                }
            })
            .then(() => {
                this.setState({
                    tradeImg: v
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    updateNotes(v) {
        return axios.post('/api/updateNotesById', {
                id: this.props.record.id,
                notes: v
            },
            {
                headers: {
                    'Content-type': 'application/json'
                }
            })
            .then(() => {
                this.setState({
                    notes: v
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
        return (
            <Drawer
                title="Trade Review"
                width={document.body.clientWidth}
                onClose={this.props.onClose}
                visible={this.props.visible}
                style={{
                    overflow: 'auto',
                    height: 'calc(100% - 108px)',
                    paddingBottom: '108px',
                }}
            >
                <ul className="trade-review-container">
                    <li>
                        <div className="trade-review-col trade-review-head">symbol</div>
                        <div className="trade-review-col trade-review-head">long_short</div>
                        <div className="trade-review-col trade-review-head">profit</div>
                    </li>
                    <li>
                        <div className="trade-review-col">{this.props.record.symbol}</div>
                        <div className="trade-review-col">{this.props.record.long_short}</div>
                        <div className="trade-review-col">{this.props.record.profit}</div>
                    </li>
                    <li>
                        <div className="trade-review-col trade-review-head trade-review-entry">entry</div>
                        <div className="trade-review-col trade-review-head trade-review-exit">exit</div>
                    </li>
                    <li>
                        <div className="trade-review-col trade-review-head">entry_date</div>
                        <div className="trade-review-col trade-review-head">entry_qty</div>
                        <div className="trade-review-col trade-review-head">entry_price</div>
                        <div className="trade-review-col trade-review-head">exit_date</div>
                        <div className="trade-review-col trade-review-head">exit_qty</div>
                        <div className="trade-review-col trade-review-head">exit_price</div>
                    </li>
                    <li>
                        <div className="scale-trades">
                            {
                                this.props.record.scale_ins && this.props.record.scale_ins.map((scaleInItem) => {
                                    return (
                                        <div className="scale-item">
                                            <div className="trade-review-col">{scaleInItem.time}</div>
                                            <div className="trade-review-col">{scaleInItem.qty}</div>
                                            <div className="trade-review-col">{scaleInItem.price}</div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                        <div className="scale-trades">
                            {
                                this.props.record.scale_outs && this.props.record.scale_outs.map((scaleOutItem) => {
                                    return (
                                        <div className="scale-item">
                                            <div className="trade-review-col">{scaleOutItem.time}</div>
                                            <div className="trade-review-col">{scaleOutItem.qty}</div>
                                            <div className="trade-review-col">{scaleOutItem.price}</div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </li>
                    <li>
                        <div className="trade-review-col trade-review-head">stop price</div>
                        <div className="trade-review-col trade-review-head">target price</div>
                    </li>
                    <li>
                        <div className="trade-review-col">
                            <EditableEle editCallback={(v) => {
                                return this.updateStopPrice(v);
                            }} staticEle={this.state.stopPrice} editType={'input'}></EditableEle>
                        </div>
                        <div className="trade-review-col">
                            <EditableEle editCallback={(v) => {
                                return this.updateTargetPrice(v);
                            }} staticEle={this.state.targetPrice} editType={'input'}></EditableEle>
                        </div>
                    </li>
                    <li>
                        <div className="trade-review-col trade-review-head">notes</div>
                    </li>
                    <li>
                        <div className="trade-review-col">
                            <EditableEle editCallback={(v) => {
                                return this.updateNotes(v);
                            }} staticEle={this.state.notes} editType={'textarea'}></EditableEle>
                        </div>
                    </li>
                    <li>
                        <div className="trade-review-col trade-review-head">trade_img</div>
                    </li>
                    <li>
                        <div className="trade-review-col">
                            <EditableEle editCallback={(v) => {
                                return this.updateTradeImg(v);
                            }} staticEle={<img width="100%" src={this.state.tradeImg} />} editType={'input'}></EditableEle>
                        </div>
                    </li>
                </ul>
            </Drawer>
        );
    }
}

export default Index;