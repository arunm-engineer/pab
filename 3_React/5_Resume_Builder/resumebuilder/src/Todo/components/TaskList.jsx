import React from 'react';
import { connect } from 'react-redux';

function TaskList(props) {
    console.log(props);
    return (
        <ul>
            {
                props.tasks.map(task => {
                    return (
                        <h2>
                            <li
                                onClick={
                                    () => {
                                        props.deleteTask(task)
                                    }
                                }>{task}</li>
                        </h2>
                    )
                })
            }
        </ul>

    )
}

let mapStateToProps = store => {
    // console.log(store);
    return store;
}

let mapDispatchToProps = dispatch => {
    return {
        deleteTask: (value) => {
            return dispatch({
                type: "delete",
                task: value
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);