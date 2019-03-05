import React from "react";
import { Drawer, Icon } from 'antd';
import "./styles.css";

class Index extends React.Component {

    constructor(props) {
        super(props);
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
                        <div className="trade-review-col">jd</div>
                        <div className="trade-review-col">long</div>
                        <div className="trade-review-col">100</div>
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
                            <div className="scale-item">
                                <div className="trade-review-col">2018-04-02 09:30</div>
                                <div className="trade-review-col">100</div>
                                <div className="trade-review-col">50</div>
                            </div>
                            <div className="scale-item">
                                <div className="trade-review-col">2018-04-02 09:30</div>
                                <div className="trade-review-col">100</div>
                                <div className="trade-review-col">50</div>
                            </div>
                            <div className="scale-item">
                                <div className="trade-review-col">2018-04-02 09:30</div>
                                <div className="trade-review-col">100</div>
                                <div className="trade-review-col">50</div>
                            </div>
                        </div>
                        <div className="scale-trades">
                            <div className="scale-item">
                                <div className="trade-review-col">2018-04-02 09:30</div>
                                <div className="trade-review-col">100</div>
                                <div className="trade-review-col">50</div>
                            </div>
                            <div className="scale-item">
                                <div className="trade-review-col">2018-04-02 09:30</div>
                                <div className="trade-review-col">100</div>
                                <div className="trade-review-col">50</div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="trade-review-col trade-review-head">stop price</div>
                        <div className="trade-review-col trade-review-head">target price</div>
                    </li>
                    <li>
                        <div className="trade-review-col">
                            40
                            <span className="edit-ico"></span>

                        </div>
                        <div className="trade-review-col">50</div>
                    </li>
                    <li>
                        <div className="trade-review-col trade-review-head">notes</div>
                    </li>
                    <li>Id
                        <div className="trade-review-col">notes</div>
                    </li>
                    <li>
                        <div className="trade-review-col trade-review-head">trade_img</div>
                    </li>
                    <li>
                        <div className="trade-review-col">
                            <Icon type="edit" />
                            {
                                /*
                                <img width={(document.body.clientWidth - 48)} src="http://picabstract-preview-ftn.weiyun.com/ftn_pic_abs_v3/35de475e9bafaf2cad8236bc98a80aae4850ace7d6b1e32459b7b121601255366071fe1035b1ed5285aca2127b014999?pictype=scale&from=30013&version=3.3.3.3&uin=195754799&fname=2018-5-30-dks-1.png&size=750" />
                                 */
                            }
                        </div>
                    </li>
                </ul>
            </Drawer>
        );
    }
}

export default Index;