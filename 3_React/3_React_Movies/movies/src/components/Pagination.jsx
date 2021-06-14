import React, { Component } from 'react'

export default class Pagination extends Component {
    render() {
        let {activePage, handlePageActiveness, pageNumberArr}  = this.props;
        return (
            <nav aria-label="...">
                <ul className="pagination">
                    {
                        pageNumberArr.map( (pageNum, idx) => {
                            if (pageNum === activePage) 
                                return <li onClick={handlePageActiveness} key={idx} className="page-item active"><span className="page-link">{pageNum}</span></li>
                            else
                                return <li onClick={handlePageActiveness} key={idx} className="page-item page-link">{pageNum}</li>
                        })
                    }
                </ul>
            </nav>
        )
    }
}
