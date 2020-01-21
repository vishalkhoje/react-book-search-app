import React, { Component } from "react";
import Axios from "axios";
import PropTypes from "prop-types";
import { formateJsonData, truncate } from "./../Common/script";
import { configObj } from "./../config";
const convert = require('xml-js');
const apiKey = process.env.REACT_APP_GOODREAD_API_KEY;

class BookInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shortDesc: "Fetching description for this book...",
            description: "",
            expanded: false,
            author: "",
            error: ""
        };
    }

    expandedText = () => {
        this.setState({
            expanded: true
        });
    }

    componentDidMount() {
        this.getDescription();
    }

    getDescription = () => {
        const bookId = this.props.detailBookInfoData.best_book.id;
        const requestUri =
            `${configObj.corsUrl}` +
            `${configObj.searchBookUrl}/${bookId}?key=${apiKey}`;

        Axios.get(requestUri)
            .then(res => {
                const jsonObj = convert.xml2js(res.data, { compact: true, spaces: 0 });
                let arrBookInfoResults = formateJsonData(jsonObj.GoodreadsResponse.book);
                if (arrBookInfoResults[0] && arrBookInfoResults[0].description) {
                    let desc = arrBookInfoResults[0].description;
                    if (desc && desc !== "") {
                        //truncate use for show desc upto 250 charaters remaning will display after cliking on read more btn
                        let shortDesc = truncate(desc, 250);
                        this.setState({
                            description: desc,
                            shortDesc: shortDesc
                        });
                    } else {
                        this.setState({ error: "No description found." });
                    }
                } else {
                    this.setState({ error: "There was an error fetching results." });
                }
            })
            .catch(error => {
                this.setState({
                    error: error.toString()
                });
            });
    };

    render() {
        const { detailBookInfoData } = this.props;
        //indents array use for creation of rating stars
        let indents = [];
        let rating = detailBookInfoData.average_rating;
        let arrNumber = rating.split(".");

        for (var i = 1; i < 6; i++) {
            if (i < arrNumber[0]) {
                indents.push(<span key={i} className="fa fa-star checked"></span>);
            } else if (i === parseInt(arrNumber[0]) && arrNumber[1] > 0) {
                indents.push(<span key={i} className="fa fa-star-half-o checked"></span>);
            } else {
                indents.push(<span key={i} className="fa fa-star"></span>);
            }
        }
        return (
            <>
                <div className="row">
                    <div className="col-lg-12 pl-4">
                        <button className="btn btn-sm btn-primary anchor-link" onClick={this.props.collapseBookInfo}>
                            {"Go Back to Serach List"}
                        </button>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-lg-2 col-sm-4 pl-4">
                        <img
                            src={detailBookInfoData.best_book.image_url}
                            alt="Book cover"
                            height="200px"
                        />
                    </div>
                    <div className="col-lg-10 col-sm-8 p-4">
                        {(this.state.error && (
                            <p className="text-danger">{this.state.error}</p>
                        )) || (
                                <>
                                    <h3>{detailBookInfoData.best_book.title}</h3>
                                    <p>
                                        By:
                                        <span className="font-weight-bold ml-1">
                                            {detailBookInfoData.best_book.author.name}
                                        </span>
                                    </p>

                                    <p>{indents}
                                        <span className="ml-1">
                                            {detailBookInfoData.average_rating}
                                        </span>
                                        <span className="ml-3 mr-1 hyperlink">
                                            {detailBookInfoData.ratings_count} Ratings
                                        </span>
                                        <span className="ml-3 mr-1 hyperlink">
                                            {detailBookInfoData.text_reviews_count} Reviews
                                        </span>
                                    </p>

                                    {(this.state.expanded && (
                                        <p dangerouslySetInnerHTML={{ __html: this.state.description }} />
                                    )) || (this.state.shortDesc && (
                                        <>
                                            <p dangerouslySetInnerHTML={{ __html: this.state.shortDesc }} />
                                            <button type="button" className="btn btn-link" onClick={this.expandedText}>...Read More</button>
                                        </>
                                    ))
                                    }
                                </>
                            )}
                    </div>
                </div>
            </>
        );
    }
}

BookInfo.propTypes = {
    detailBookInfoData: PropTypes.object,
    collapseBookInfo: PropTypes.func
};

export default BookInfo;
