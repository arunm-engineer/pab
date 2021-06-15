import React, { Component } from 'react'

export default class MovieList extends Component {
    render() {
        let { displayMovies, DeleteMovie } = this.props;
        return (
            displayMovies.map( (movieObj) => {
                return (
                    <tr className="movie-item" key={movieObj._id}>
                        <td>{movieObj.title}</td>
                        <td>{movieObj.genre.name} </td>
                        <td>{movieObj.numberInStock}</td>
                        <td>{movieObj.dailyRentalRate}</td>
                        <td><button className="btn btn-danger" onClick={() => {DeleteMovie(movieObj._id)} }>Delete</button></td>
                    </tr>
                )
            })
        )
    }
}