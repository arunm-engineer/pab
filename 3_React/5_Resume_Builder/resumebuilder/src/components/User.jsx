import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { userFetchMiddleWare } from '../redux/User/userFetchMiddleWare';

function User(props) {
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState('');
    // const [users, setUsers] = useState([]);

    const { loading, error, users } = props;

    useEffect(async () => {
        // Making async task of fetching the user
        props.fetchUser();
        console.log("The above make function will carry out the async task of fetching the users");
    }, [])

    return (
        <div>
            {
                loading ? <h2>Loading...</h2> :
                error ? <h2>{error}</h2> :
                <>
                    <h2>User List</h2>
                    {
                        users.map(user => {
                            return (
                                <li
                                style={{listStyle: "none",}}
                                key={user.id}>
                                    {user.name}
                                </li>
                            )
                        })
                    }
                </>
            }
        </div>
    )
}

function mapStateToProps(store) {
    return store.User;
}

function mapDispatchToProps(dispatch) {
    return {
        fetchUser: () => {
            // Dispatching middleware function since async task to be carried out
            // So this dispatch will further get to the middleware
            return dispatch(userFetchMiddleWare);
        }    
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);