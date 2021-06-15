import React, { Component } from 'react'
import MoviesPage from './MoviesPage'
import New from './New'
import { getMovies } from '../temp/MovieService'
import { Link, Switch, Route, Redirect } from "react-router-dom"

export default class Routing extends Component {
    state = {
        moviesList: getMovies()
    }
    updateMoviesList = (newMovie) => {
        let updatedMovies = [...this.state.moviesList, newMovie];
        this.setState({
            moviesList: updatedMovies
        })
    }
    componentDidMount() {
        let moviesListFetchP = fetch("https://react-backend101.herokuapp.com/movies");  // Get movies from backend
        moviesListFetchP.then((responseP) => {
            responseP.json().then((response) => {
                this.setState({
                    moviesList: response.movies,
                })
            })

        })
    }
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-dark">
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <li className="nav-item nav-link text-light"><Link to='/' style={{ textDecoration: 'none' }}>Home</Link></li>
                        <li className="nav-item nav-link text-light"><Link to='/' style={{ textDecoration: 'none' }}>Login</Link></li>
                    </div>
                </div>
                </nav>
                 <Switch>
                    <Route path='/movies/new' render={() => {
                        return <New updateMoviesList={this.updateMoviesList}></New>
                    }}></Route>
                    <Redirect rxact from='/login' to='/'></Redirect>
                    <Redirect exact from='/home' to='/'></Redirect>
                    <Route exact path='/' render={() => {
                        return <MoviesPage updateMoviesList={this.updateMoviesList} moviesList={this.state.moviesList}></MoviesPage>
                    }}></Route>
                </Switch>
            </div>
        )
    }
}
