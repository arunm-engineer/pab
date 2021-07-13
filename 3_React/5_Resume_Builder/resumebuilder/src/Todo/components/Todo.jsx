import React, { useState } from 'react';
import { connect } from 'react-redux';
import TaskList from './TaskList';

function Todo(props) {
    const [value, setValue] = useState("");
    console.log(props);
    return (
        <div>
            <input type="text" value={value} onChange={(e) => { setValue(e.target.value) }} />
            <button onClick={() => {
                props.addTask(value);
                setValue("");
            }}>Add Task</button>
            <TaskList></TaskList>
        </div>
    )
}


let mapStateToProps = store => {
    // console.log(store);
    return store;
}

let mapDispatchToProps = dispatch => {
    return {
        addTask: (value) => {
            return dispatch({
                type: "add",
                task: value
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todo);