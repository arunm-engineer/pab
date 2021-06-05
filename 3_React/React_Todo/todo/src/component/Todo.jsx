// react snippet
// rcc
import React, { Component } from 'react'
import TaskList from './TaskList';


export default class Todo extends Component {

    state = {
        taskList: [],
        currTask: ""
    }

    // Use arrow functions to avoid confusion of "this" keyword
    DeleteTask = (id) => {

        let filteredTasks = this.state.taskList.filter((taskObj) => {
            return ( taskObj.id !== id ); 
        })

        this.setState({
            taskList: filteredTasks
        })

    }

    HandleCurrTask = (e) => {
        let newTaskValue = e.target.value;
        this.setState({
            currTask: newTaskValue
        })
    }

    AddTask = () => {
        let newTask = this.state.currTask;
        let tempTaskListArray = [...this.state.taskList, { task: newTask, id: this.state.taskList.length }];  //Short-hand to copy all array elements(soread operator)
        this.setState({
            taskList: tempTaskListArray,
            currTask: ""
        })
    }

    render() {
        return (
            <div>
                <div className="input-container">
                    <input type="text" value={this.state.currTask} 
                    onChange={this.HandleCurrTask} />
                    <button onClick={this.AddTask} >Submit</button>
                </div>
                <TaskList taskList={this.state.taskList} deleteTask={this.DeleteTask}></TaskList>
            </div>
        )
    }
}
