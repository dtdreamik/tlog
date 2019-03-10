import React from "react";
import { Icon } from 'antd';
import "./styles.css";

const EditediInput = function(props) {
    return <input type="text" ref={props.editRef} />;
}

const EditediTextarea = function(props) {
    return <textarea ref={props.editRef} />;
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
                this.editEleRef.current.value = this.props.val;
            });
        }
    }

    render() {
        return (
            <div className="editableEleContainer">
                {this.state.showStaticEle ?
                    this.props.staticEle : this.props.editType === 'input' ?
                        <EditediInput editRef={this.editEleRef} /> : <EditediTextarea editRef={this.editEleRef} />}
                <Icon type="edit" className="editIco" onClick={() => {
                    this.clickEditIcon()
                }}/>
            </div>
        );
    }
}

export default Index;