import React, { Component } from 'react'
import Pagination from './Pagination'
import MovieList from './MovieList'
import Genres from './Genres'
import MoviesHeader from './MoviesHeader'
import { Link } from 'react-router-dom'


export default class MoviesPage extends Component {
    state = {
        moviesList: this.props.moviesList,
        currSearchText: "",
        limit: 4,
        activePage: 1,
        activeGenre: "All Genres"
    }
    DeleteMovie = (id) => {
        let filteredMovies = this.state.moviesList.filter( (movieObj) => {
            return ( movieObj._id !== id );
        })

        this.setState({
            moviesList: filteredMovies
        })
    }
    setCurrentText = (e) => {
        let text = e.target.value.toLowerCase().trim();

        // When filtered take active page to 1
        this.setState({
            currSearchText: text,
            activePage: 1          
        })
    }
    sortStock = (e) => {
        let className = e.target.className;
        let sortedMovies;
        if (className === "fas fa-angle-up") {  // Ascending 
            sortedMovies = this.state.moviesList.sort( (movieA, movieB) => movieA.numberInStock - movieB.numberInStock);
        }
        else {                                  // Descending
            sortedMovies = this.state.moviesList.sort( (movieA, movieB) => movieB.numberInStock - movieA.numberInStock);
        }

        this.setState({
            moviesList: sortedMovies
        })
    }
    sortRate = (e) => {
        let className = e.target.className;
        let sortedMovies;
        if (className === "fas fa-angle-up") {  // Ascending 
            sortedMovies = this.state.moviesList.sort( (movieA, movieB) => movieA.dailyRentalRate - movieB.dailyRentalRate );
        }
        else {                                  // Descending
            sortedMovies = this.state.moviesList.sort( (movieA, movieB) => movieB.dailyRentalRate - movieA.dailyRentalRate );
        }
        this.setState({
            moviesList: sortedMovies
        })
    }
    mapLimit = (e) => {
        let value = Number(e.target.value);
        if (value && value > 0) {
            this.setState({
                limit: value,
                activePage: 1
            })
        }

    }
    handlePageActiveness = (e) => {
        let requestedPage = Number(e.currentTarget.innerText);
        this.setState({
            activePage: requestedPage
        })
    }
    handleGenreActiveness = (e) => {
        let requestedGenre = e.target.innerText;
        console.log(requestedGenre);
        this.setState({
            activeGenre: requestedGenre,
            currSearchText: "",
            activePage: 1
        })

    }
    componentDidMount() {
        this.setState({
            moviesList: this.props.moviesList
        })
    }

    render() {
        // Filtering
        let {moviesList, currSearchText} = this.state;
        
        let searchFilteredMovies = moviesList.filter((movieObj) => {
            let movieName = movieObj.title.toLowerCase().trim();
            return movieName.includes(currSearchText);  // Every string includes ""
        })

        let genreFilteredMovies = searchFilteredMovies.filter(movieObj => {
            return this.state.activeGenre === movieObj.genre.name;
        })

        let requestedMovies = (genreFilteredMovies.length > 0) ? genreFilteredMovies : searchFilteredMovies;

        let numberOfPagesToDisplay = Math.ceil(requestedMovies.length/this.state.limit);
        let pageNumberArr = [];
        for (let i = 0;i < numberOfPagesToDisplay;i++) {
            pageNumberArr.push(i+1);
        }

        // Pagination
        let startIdx = (this.state.activePage-1) * (this.state.limit);
        let endIdx = (startIdx + this.state.limit);

        let displayMovies = requestedMovies.slice(startIdx, endIdx);

        return (
            
            <div className="row">
                <div className="col-3 mt-5">
                    <Genres activeGenre={this.state.activeGenre} handleGenreActiveness={this.handleGenreActiveness}></Genres>
                </div>

                <div className="col-9 mt-5">
                    {/* <button className="btn btn-primary">New</button> */}
                    <button type="button" className="btn btn-dark">
                        <Link to='/movies/new' style={{ textDecoration: 'none',color: "white" }}>New</Link>
                    </button>
                    <div>
                        <input type="search" onChange={this.setCurrentText} value={this.state.currSearchText}/>
                        <input onChange={this.mapLimit} value={this.state.limit} className="limit ml-5" type="number" placeholder="Limit.."/>
                    </div>
                    <table className="table">
                        <thead>
                            <MoviesHeader sortRate={this.sortRate} sortStock={this.sortStock}></MoviesHeader>
                        </thead>
                        <tbody>
                            <MovieList displayMovies={displayMovies} DeleteMovie={this.DeleteMovie}></MovieList>
                        </tbody>
                    </table>
                    <Pagination activePage={this.state.activePage} pageNumberArr={pageNumberArr} handlePageActiveness={this.handlePageActiveness}></Pagination>
                </div>
            </div>
            
        )
    }
}
