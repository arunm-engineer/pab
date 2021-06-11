import React, { Component } from 'react'
// import { getMovies } from '../temp/MovieService'

export default class MoviesPage extends Component {
    state = {
        moviesList: [],
        genresList: [],
        currSearchText: "",
        limit: 4,
        activePage: 1,
        activeGenre: ""
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
            activeGenre: requestedGenre
        })

    }
    componentDidMount() {
        let moviesListFetchP = fetch("https://react-backend101.herokuapp.com/movies");  // Get movies from backend
        moviesListFetchP.then((responseP) => {
            responseP.json().then((response) => {
                this.setState({
                    moviesList: response.movies
                })
            })

        })
        let genresListFetchP = fetch("https://react-backend101.herokuapp.com/genres");  // Get genre from backend
        genresListFetchP.then((responseP) => {
            responseP.json().then((response) => {
                this.setState({
                    genresList: response.genres
                })
            })
        })
    }

    render() {
        // Filtering
        let {moviesList, currSearchText} = this.state;
        let searchFilteredMovies = moviesList.filter((movieObj) => {
            let movieName = movieObj.title.toLowerCase().trim();
            return (movieName.includes(currSearchText)) && (this.state.activeGenre === movieObj.genre.name);
        })

        if (this.state.activeGenre === "") {    // If no active genre, then init all movies
            searchFilteredMovies = moviesList;
        }

        let numberOfPagesToDisplay = Math.ceil(searchFilteredMovies.length/this.state.limit);
        let pageNumberArr = [];
        for (let i = 0;i < numberOfPagesToDisplay;i++) {
            pageNumberArr.push(i+1);
        }

        // Pagination
        let startIdx = (this.state.activePage-1) * (this.state.limit);
        let endIdx = (startIdx + this.state.limit);

        let displayMovies = searchFilteredMovies.slice(startIdx, endIdx);

        return (
            <div className="row">
                <div className="col-3">
                    <ul className="list-group">
                        {
                            this.state.genresList.map( (genreObj) => {
                                if (genreObj.name === this.state.activeGenre)
                                    return <li onClick={this.handleGenreActiveness} className="list-group-item active" key={genreObj._id}>{genreObj.name}</li>
                                else 
                                    return <li onClick={this.handleGenreActiveness} className="list-group-item" key={genreObj._id}>{genreObj.name}</li>
                            })
                        }             
                    </ul>
                </div>
                <div className="col-9">
                    {/* <button className="btn btn-primary">New</button> */}
                    <input type="search" onChange={this.setCurrentText} value={this.state.currSearchText}/>
                    <input onChange={this.mapLimit} value={this.state.limit} className="limit" type="number" placeholder="Limit.."/>
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Genre</th>
                            <th scope="col">Stock
                                {/* Sorting */}
                                <i onClick={this.sortStock} className="fas fa-angle-up"></i>
                                <i onClick={this.sortStock} className="fas fa-angle-down"></i>
                            
                            </th>
                            <th scope="col">Rate
                                {/* Sorting */}
                                <i onClick={this.sortRate} className="fas fa-angle-up"></i>
                                <i onClick={this.sortRate} className="fas fa-angle-down"></i>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                                {   
                                    displayMovies.map( (movieObj) => {
                                        return (
                                            <tr className="movie-item" key={movieObj._id}>
                                                <td>{movieObj.title}</td>
                                                <td>{movieObj.genre.name} </td>
                                                <td>{movieObj.numberInStock}</td>
                                                <td>{movieObj.dailyRentalRate}</td>
                                                <td><button className="btn btn-danger" onClick={() => {this.DeleteMovie(movieObj._id)} }>Delete</button></td>
                                            </tr>
                                        )
                                    })
                                }

                        </tbody>
                    </table>
                    <nav aria-label="...">
                        <ul className="pagination">
                            {
                                pageNumberArr.map( (pageNum, idx) => {
                                    if (pageNum === this.state.activePage) 
                                        return <li onClick={this.handlePageActiveness} key={idx} className="page-item active"><span className="page-link">{pageNum}</span></li>
                                    else
                                        return <li onClick={this.handlePageActiveness} key={idx} className="page-item page-link">{pageNum}</li>
                                })
                            }
                        </ul>
                    </nav>
                </div>
            </div>
            
        )
    }
}