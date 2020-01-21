import React from "react";
import PropTypes from "prop-types";
import { truncate } from "./../Common/script";

const SearchResult = ({ bookData, handleBtnDetailBook }) => {
    /**
     * truncate book title to first 4 words and append it with '...'
     * Full title will be shown in a tooltip
     */
    const bookTitle = bookData.best_book.title;
    let displayTitle = bookTitle
        .split(" ")
        .slice(0, 4)
        .join(" ");
    if (bookTitle.length > displayTitle.length) {
        displayTitle += "...";
    }
    let autherName = bookData.best_book.author.name;
    let displayAutherName = truncate(autherName, 10);
    console.log(truncate(autherName, 10))
    return (
        <div className="col-xs-3 col-sm-6 col-md-3 col-lg-2">
            <div className="card card-height">
                <img
                    className="card-img-top"
                    src={bookData.best_book.image_url}
                    alt="Book cover"
                    height="200px"
                />
                <div className="card-body">
                    <h4
                        className="card-title card-title-heading"
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title={displayTitle.includes("...") ? bookTitle : ""}
                    >
                        {displayTitle}
                    </h4>
                    <p className="text-sm-left card-text" 
                        data-toggle="tooltip"
                        data-placement="bottom" 
                        title={displayAutherName.includes("...") ? autherName : ""}>
                        { displayAutherName }
                    </p>

                    <button
                        className="btn btn-primary"
                        onClick={() => handleBtnDetailBook(bookData)}
                    >
                        More Info
          </button>
                </div>
            </div>
        </div>
    );
};

SearchResult.propTypes = {
    bookData: PropTypes.object,
    handleBtnDetailBook: PropTypes.func
};

export default SearchResult;
