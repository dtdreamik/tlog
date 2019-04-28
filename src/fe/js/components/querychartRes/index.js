import React from "react";

class Index extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div style={{
                background: 'white',
                marginTop: '10px',
                paddingLeft: '10px'
            }}>
                {
                    this.props.charts.map((item) => {
                        return (
                            <div>
                                <div>{item.symbol}</div>
                                <div>{item.date}</div>
                                <div>
                                    {
                                        item.entry_strategies && item.entry_strategies.map(function(item) {
                                            return (
                                                <span>{item.name}</span>
                                            );
                                        })
                                    }
                                </div>
                                <div>
                                    {
                                        item.tags && item.tags.map(function(item) {
                                            return (
                                                <span>{item.name}</span>
                                            );
                                        })
                                    }
                                </div>
                                <div>
                                    {
                                        item.notes
                                    }
                                </div>
                                <div><img src={item.path} style={{
                                    width: '100%'
                                }}/></div>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

export default Index;