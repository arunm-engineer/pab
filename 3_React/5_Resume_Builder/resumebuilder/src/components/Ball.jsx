import React from 'react';

// Connect is responsible to pull state from redux store
import { connect } from "react-redux";

function Ball(props) {
    console.log(props);
    return (
        <div>
            <h1>Number of Balls {props.balls}</h1>
            <button onClick={props.buyBall}>Buy Balls</button>
            <button onClick={props.sellBall}>Sell Balls</button>
        </div>
    )
}

// 5. -> Provide state varibles from store
const mapStateToProps = store => {
    console.log("In mapStateToProp", store);
    return store;
}

// Dispatch actions which are dispatched on request for any state updates
const mapDispatchToProps = dispatch => {
    // Action or handler function which is dispatched to make state updates
    return {
        buyBall: () => {
            // dispatch action for buyball
            return dispatch({ type: "buy_ball" });
        },
        sellBall: () => {
            // dispatch action for sellball
            return dispatch({ type: "sell_ball" });
        }
    }
}

// connect is a higher order function & connect is responsible to get the state from the redux store
// Finally the state will be passed to Ball component as props
export default connect(mapStateToProps, mapDispatchToProps)(Ball);
