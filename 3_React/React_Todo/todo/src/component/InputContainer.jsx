import { Component } from "react";

export default class InputContainer extends Component {
    state = {
        currTask: ""
    }
    HandleCurrTask = (e) => {
        let newTaskValue = e.target.value;
        this.setState({
            currTask: newTaskValue
        })
    }
    sendCurrTaskToParent = () => {
        this.props.AddTask(this.state.currTask);
        this.setState({
            currTask: ""
        })
    }
    render() {
        return (
            <div className="input-container">
                <input type="text" value={this.state.currTask} 
                onChange={this.HandleCurrTask} />
                <button onClick={this.sendCurrTaskToParent} >Submit</button>
            </div>
        )
    }
}