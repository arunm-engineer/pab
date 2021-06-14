import React, { Component } from 'react'

export default class New extends Component {
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
        return (
            <div>
                <form>
                    <div class="form-group  mt-3">
                        <label for="title">Title</label>
                        <input type="text" class="form-control" id="title" placeholder="Enter title..." />
                    </div>

                    <div class="form-group mt-3">
                        <label for="genre">Genre</label>
                        <select id="genre" class="form-select">
                            <option selected>All Genres</option>
                            {
                                this.state.genresList.map(genreObj => {
                                    return (
                                        <option value={genreObj._id}>{genreObj.name}</option>
                                    );
                                })
                            }
                        </select>
                    </div>

                    <div class="form-group mt-3 new-form-input-number">
                        <label for="number-in-stock">Number In Stock</label>
                        <input type="number" class="form-control number-input" id="number-in-stock" />
                    </div>
                    <div class="form-group mt-3 new-form-input-number">
                        <label for="daily-rental-rate">Rate</label>
                        <input type="number" class="form-control" id="daily-rental-rate" />
                    </div>
                    <button type="submit" class="btn btn-success mt-4">Submit</button>
                </form>
            </div>
        )
    }
}
