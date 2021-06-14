import React, { Component } from 'react'

export default class MoviesHeader extends Component {
    render() {
        let { sortRate, sortStock } = this.props;
        return (
            <tr>
                <th scope="col">Title</th>
                <th scope="col">Genre</th>
                <th scope="col">Stock
                    {/* Sorting */}
                    <i onClick={sortStock} className="fas fa-angle-up"></i>
                    <i onClick={sortStock} className="fas fa-angle-down"></i>
                
                </th>
                <th scope="col">Rate
                    {/* Sorting */}
                    <i onClick={sortRate} className="fas fa-angle-up"></i>
                    <i onClick={sortRate} className="fas fa-angle-down"></i>
                </th>
            </tr>
        )
    }
}
