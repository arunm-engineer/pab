import React, { Component } from 'react'
// import { location } from 'react-router';
import { v4 as uuidv4 } from 'uuid';

export default class New extends Component {
    state = {
        genresList: [],
        title: "",
        genre: "Action",
        rate: 5,
        stock: 1,
    }
    updateTitle = (e) => {
        let movieTitle = e.target.value;
        this.setState({
            title: movieTitle
        })
    }
    updateGenre = (e) => {
        let movieGenre = e.target.value;
        this.setState({
            genre: movieGenre
        })
    }
    updateRate = (e) => {
        let movieRate = Number(e.target.value);
        if (movieRate < 0 || movieRate > 5) return;
        this.setState({
            rate: movieRate
        })
    }
    updateStock = (e) => {
        let movieStock = Number(e.target.value);
        if (movieStock < 1) return;
        this.setState({
            stock: movieStock
        })
    }
    createNewMovieObject = (e) => {
        if (this.state.title.trim() === "") return;
        let newMovie = {
            _id: uuidv4(),
            title: this.state.title,
            genre: { _id: uuidv4(), name: this.state.genre },
            numberInStock: this.state.stock,
            dailyRentalRate: this.state.rate
        }
        
        this.props.updateMoviesList(newMovie);
        e.preventDefault();
    }
    componentDidMount() {
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
        return (
            <div className="m-5">
                <form onSubmit={this.createNewMovieObject}>
                    <div className="form-group  mt-3">
                        <label htmlFor="title">Title</label>
                        <input onChange={this.updateTitle} value={this.state.title} type="text" className="form-control mt-1" id="title" placeholder="Enter movie title..." required/>
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="genre">Genre</label>
                        <select id="genre" onChange={this.updateGenre} className="form-select mt-1">
                            {
                                this.state.genresList.map((genreObj) => {
                                    return (
                                        <option key={genreObj._id} value={genreObj.name}>{genreObj.name}</option>
                                    );
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group mt-3 new-form-input-number">
                        <label htmlFor="stock">Number In Stock</label>
                        <input onChange={this.updateStock} value={this.state.stock} type="number" className="form-control mt-1" id="stock" required/>
                    </div>
                    <div className="form-group mt-3 new-form-input-number">
                        <label htmlFor="rate">Rate</label>
                        <input onChange={this.updateRate} value={this.state.rate} type="number" className="form-control mt-1" id="rate" required/>
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">Submit</button>
                </form>
            </div>
        )
    }
}
