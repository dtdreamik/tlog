import React from "react";
import { Icon, Select } from 'antd';
import "./styles.css";

const Option = Select.Option;

const EditediInput = function(props) {
    return <input type="text" ref={props.editRef} />;
}

const EditediTextarea = function(props) {
    return <textarea ref={props.editRef} />;
}

const EditediSelect = function(props) {
    return (
        <select ref={props.editRef} style={{ width: '100%' }} >
            {
                props.selectOptions.map((item) => {
                    return <option value={item.id}>{item.name}</option>;
                })
            }
        </select>
    )
}

class Index extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showStaticEle: true
        };

        this.editEleRef = React.createRef();
    }

    clickEditIcon() {

        if (this.clickEditIcon.pending) {
            return;
        }

        this.clickEditIcon.pending = true;

        if (!this.state.showStaticEle) {
            //由编辑状态 切回 显示状态  先保存编辑信息
            this.props.editCallback(this.editEleRef.current.value)
                .then(() => {
                    this.setState({
                        showStaticEle: !this.state.showStaticEle
                    });
                    this.clickEditIcon.pending = false;
                })
                .catch(() => {
                    this.setState({
                        showStaticEle: !this.state.showStaticEle
                    });
                    this.clickEditIcon.pending = false;
                });
        } else {
            console.log('clickEditIcon ' + this.props.val);
            this.clickEditIcon.pending = false;
            this.setState({
                showStaticEle: !this.state.showStaticEle
            }, () => {
                if (this.props.editType === 'select') {
                    let options = this.editEleRef.current.children;
                    let index = 0;
                    for (let i = 0; i < options.length; i++) {
                        if (options[i].value === (this.props.val + '')) {
                            index = i;
                        }
                    }
                    this.editEleRef.current.selectedIndex = index;
                } else {
                    this.editEleRef.current.value = this.props.val;
                }
            });
        }
    }

    render() {
        return (
            <div className="editableEleContainer">
                {this.state.showStaticEle ?
                    this.props.staticEle : this.props.editType === 'input' ?
                        <EditediInput editRef={this.editEleRef} /> :
                        this.props.editType === 'select' ?
                        <EditediSelect selectOptions={this.props.selectOptions} editRef={this.editEleRef} /> : <EditediTextarea editRef={this.editEleRef} />}
                <Icon type="edit" className="editIco" onClick={() => {
                    this.clickEditIcon()
                }}/>
            </div>
        );
    }
}

export default Index;