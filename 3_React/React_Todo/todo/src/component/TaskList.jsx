import React, { Component } from 'react'

export default class TaskList extends Component {
    render() {
        return (
            <div className="task-list">
                    <ul>
                        {/* 
                        
                            // The below code part works just like this
                            // [ <li><p>Task1</p><button>Delete</button></li>, <li><p>Task2</p><button>Delete</button></li> ]

                        */}
                            
                        {
                            this.props.taskList.map((taskObj)=>{
                                return (
                                    <li className="task" key={taskObj.id} >
                                        <p>{ taskObj.task }</p>
                                        <button onClick = { () => {this.props.deleteTask(taskObj.id)} }>Delete</button>
                                    </li>
                                )
                                
                            })
                        }
                    </ul>
            </div>
        )
    }
}
