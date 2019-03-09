import React from 'react';
import ReactDOM from 'react-dom';
import { Layout } from 'antd';
import axios from "axios/index";
import "antd/dist/antd.css";
import "../../css/reset.css";

import Header from  '../components/header';
import Navigator from  '../components/navigator';
import AnalyseForm from '../components/analyseForm';
import AnalyseRes from '../components/analyseRes';


class App extends React.Component {

    componentDidUpdate() {

    }

    handleSubmit = (formObj) => {

        formObj.validateFields((err, fieldsValue) => {

            if (err) {
                return;
            }

            let {strategy, long_or_short, day_of_week, date_range, time_range1,
                time_range2, time_range3, time_range4, time_range5, time_range6,
                time_range7, time_range8, time_range9, time_range10} = fieldsValue;


            let date_rangeArr;
            let time_ranges = [];

            if (date_range) {
                date_rangeArr = [date_range[0].format('YYYY-MM-DD'), date_range[1].format('YYYY-MM-DD')];
            }

            if (time_range1 && time_range2) {
                time_ranges.push([time_range1.format('HH:mm'), time_range2.format('HH:mm')]);
            }

            if (time_range3 && time_range4) {
                time_ranges.push([time_range3.format('HH:mm'), time_range4.format('HH:mm')]);
            }

            if (time_range5 && time_range6) {
                time_ranges.push([time_range5.format('HH:mm'), time_range6.format('HH:mm')]);
            }

            if (time_range7 && time_range8) {
                time_ranges.push([time_range7.format('HH:mm'), time_range8.format('HH:mm')]);
            }

            if (time_range9 && time_range10) {
                time_ranges.push([time_range9.format('HH:mm'), time_range10.format('HH:mm')]);
            }

            //strategy  long or short  day of week  date range  time period1  time period2  time period3

            let data = {
                strategy,
                long_or_short,
                day_of_week,
                date_range: date_rangeArr || '',
                time_ranges: time_ranges.length > 0 ? time_ranges : ''
            };

            axios.post('/api/analyseTrade', data,
                {
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
                .then((response) => {

                    this.setState({
                        analyseRes: response.data.data
                    });
                })
                .catch(function (error) {
                    console.error(error);
                });
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            analyseRes: {}
        };
    }

    render () {
        return (
            <Layout style={{paddingBottom: '50px'}}>
                <Header />
                <Layout>
                    <Navigator target={'index'} />
                    <Layout style={{ paddingLeft: '5px' }}>
                        <AnalyseForm onHandleSubmit={this.handleSubmit} />
                        <AnalyseRes analyseData={this.state.analyseRes}/>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

