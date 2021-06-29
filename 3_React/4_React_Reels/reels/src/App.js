import logo from './logo.svg';
import './App.css';
import { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { AuthProvider, AuthContext } from './Contexts/AuthProvider';
import Login from './components/Login';
import SignUp from './components/Signup';
import Profile from './components/Profile';
import Feed from './components/Feed';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path='/login' component={Login}></Route>
          <Route path='/signup' component={SignUp}></Route>
          <PrivateRoute path='/profile' privateComponent={Profile}></PrivateRoute>
          <PrivateRoute path='/' privateComponent={Feed}></PrivateRoute>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

function PrivateRoute({privateComponent: Component, ...restProps}) {
  const { currentUser } = useContext(AuthContext);
  return (
    <Route {...restProps} render={(props) => {
      return (currentUser !== null) ? <Component {...props}/> : <Redirect to='/login'></Redirect>
    }}></Route>
  );
}

export default App;