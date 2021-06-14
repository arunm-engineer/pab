// react snippet
// rcc
import React, { Component } from 'react'
import TaskList from './TaskList'
import InputContainer from './InputContainer'

export default class Todo extends Component {

    state = {
        taskList: []
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

    AddTask = (newTask) => {
        let tempTaskListArray = this.state.taskList.map((taskObj, idx) => {return {task: taskObj.task, id: idx} });
        tempTaskListArray.push({task: newTask, id: this.state.taskList.length});
        // let tempTaskListArray = [...this.state.taskList, { task: newTask, id: this.state.taskList.length }];  //Short-hand to copy all array elements(soread operator)
        this.setState({
            taskList: tempTaskListArray,
            currTask: ""
        })
    }

    render() {
        return (
            <div>
                <InputContainer AddTask={this.AddTask}></InputContainer>
                <TaskList taskList={this.state.taskList} deleteTask={this.DeleteTask}></TaskList>
            </div>
        )
    }
}