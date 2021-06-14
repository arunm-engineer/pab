import React, { Component } from 'react'

export default class Genre extends Component {
    state = {
        genresList: []
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
        let { handleGenreActiveness, activeGenre } = this.props;
        return (
            <ul className="list-group">
                <li onClick={handleGenreActiveness} className={`list-group-item ${(activeGenre==="All Genres") ? " active" : ""}`}>All Genres</li>
                {
                    this.state.genresList.map( (genreObj) => {
                        if (genreObj.name === activeGenre)
                            return <li onClick={handleGenreActiveness} className="list-group-item active" key={genreObj._id}>{genreObj.name}</li>
                        else 
                            return <li onClick={handleGenreActiveness} className="list-group-item" key={genreObj._id}>{genreObj.name}</li>
                    })
                }             
            </ul>
        )
    }
}
