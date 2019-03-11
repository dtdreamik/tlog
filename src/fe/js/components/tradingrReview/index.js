import React from "react";
import { Drawer, Icon } from 'antd';
import "./styles.css";
import EditableEle from '../editableEle';


class Index extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        console.log('tradingreview render');
        console.log(this.props.record.trade_img);
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
                        <div className="trade-review-col trade-review-head">need review</div>
                    </li>
                    <li>
                        <div className="trade-review-col">
                            <EditableEle editCallback={this.props.updateStopPrice} val={this.props.record.stop_price} staticEle={this.props.record.stop_price} editType={'input'}></EditableEle>
                        </div>
                        <div className="trade-review-col">
                            <EditableEle editCallback={this.props.updateTargetPrice} val={this.props.record.target_price} staticEle={this.props.record.target_price} editType={'input'}></EditableEle>
                        </div>
                        <div className="trade-review-col">
                            <EditableEle editCallback={this.props.updateNeedReview} val={this.props.record.need_review} staticEle={this.props.record.need_review} editType={'input'}></EditableEle>
                        </div>
                    </li>
                    <li>
                        <div className="trade-review-col trade-review-head">notes</div>
                    </li>
                    <li>
                        <div className="trade-review-col">
                            <EditableEle editCallback={this.props.updateNotes} val={this.props.record.notes}  staticEle={this.props.record.notes} editType={'textarea'}></EditableEle>
                        </div>
                    </li>
                    <li>
                        <div className="trade-review-col trade-review-head">trade_img</div>
                    </li>
                    <li>
                        <div className="trade-review-col">
                            <EditableEle editCallback={this.props.updateTradeImg} val={this.props.record.trade_img}   staticEle={<img width="100%" src={this.props.record.trade_img} />} editType={'input'}></EditableEle>
                        </div>
                    </li>
                </ul>
            </Drawer>
        );
    }
}

export default Index;