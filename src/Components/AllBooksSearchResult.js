import React from 'react';
import PropTypes from 'prop-types';
import SearchResult from "./SearchResult";

const AllBooksSearchResult = ({ allBooks, handleBtnDetailBook }) => {
    return (
        <div className="row p-3">
            {   allBooks.map( book => ( 
                <SearchResult 
                    bookData = { book } 
                    key = { book.id } 
                    handleBtnDetailBook = { handleBtnDetailBook } />
            ))  }
        </div>
    )
}

AllBooksSearchResult.propTypes = {
    allBooks: PropTypes.array,
    handleBtnDetailBook: PropTypes.func
}

export default AllBooksSearchResult

