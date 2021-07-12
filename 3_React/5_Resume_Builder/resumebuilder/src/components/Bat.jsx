import React, { useState } from 'react';
import { connect } from "react-redux";

function Bat(props) {
    const [value, setValue] = useState("");
    return (
        <div>
            <h1>Number of Bats: {props.quantity}</h1>
            <input type="text" value={value}
            onChange={(e) => {
                setValue(e.target.value);
            }} />
            <button onClick={() => {
                props.setBat(value);
                setValue("");
            }}>Buy Bat</button>
        </div>
    )
}

const mapStateToProps = store => {
    console.log("In mpaStateToProps", store);
    return store.Bat;
}

// dispatch action provided to reducer
const mapDispatchToProps = dispatch => {
    // action or handler functions
    return {
        setBat: (val) => {
            dispatch({
                type: "buy_bat",
                // Data to be sent to the reducer function
                payload: val
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bat);
