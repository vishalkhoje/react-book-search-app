import React, { Component } from 'react';
import axios from "axios";
import AllBooksSearchResult from "./AllBooksSearchResult";
import BookInfo from "./BookInfo";
import { formateJsonData } from "./../Common/script";
import { configObj } from "./../config";
const  convert = require('xml-js');
const apiKey = process.env.REACT_APP_GOODREAD_API_KEY;

export default class Searchbar extends Component {
	state = {
		searchText: "",
		error: "",
		fetchingData: false,
		detailBookInfo: null,
		searchResults: [],
	};

	setSearcResults = (searchResults) => {
		this.setState({ searchResults, fetchingData: false });
	}

	handleOnTextChange = e => {
		this.setState({
			searchText: e.target.value
		});
	};

	handleBtnDetailBook = detailBookInfoData => {
		this.setState({ detailBookInfoData });
	};

	collapseBookInfo = () => {
		this.setState({
			detailBookInfoData: null
		});
	};

	handleSearchBtnClick = e => {
		this.setState({
			fetchingData: true,
			detailBookInfoData: null
		});
		const { searchText } = this.state;
		const requestBookSearchUrl =
			`${configObj.corsUrl}` +
			`${configObj.searchAllBooksUrl}?key=${apiKey}&q=${searchText}`;

		axios.get(requestBookSearchUrl)
			.then(res => {
				const options = { compact: true, spaces: 0};
				const jsonObj = convert.xml2js(res.data, options);
				const arrSearchResults = jsonObj.GoodreadsResponse.search.results.work;
				const arrNewSearchResult = formateJsonData(arrSearchResults);
				this.setSearcResults(arrNewSearchResult);
			})
			.catch(error => {
				this.setState({
					error: error.toString(),
					fetchingData: false
				});
			});
	}

	render() {
		return (
			<div>
				<div className="col-12 col-md-10 col-lg-12 form-group">
					<div className="row p-3">
						<div className="col">
							<input
								className="form-control form-control-lg form-control-borderless"
								type="search"
								placeholder="Search Books By title, author, or ISBN"
								name="searchText"
								onChange={this.handleOnTextChange}
								value={this.state.searchText}
							/>
						</div>
						<div className="col-auto">
							<button className="btn btn-lg btn-primary"
								type="submit"
								onClick={this.handleSearchBtnClick}
							>
								Search Book
							</button>
						</div>
					</div>
				</div>
				{this.state.fetchingData ? (
					<p className="lead text-center">{"loading... "}</p>
				) : (
						(this.state.error && (
							<p className="text-danger">{this.state.error}</p>
						)) || (this.state.detailBookInfoData ? (
							<BookInfo
								detailBookInfoData={this.state.detailBookInfoData}
								collapseBookInfo={this.collapseBookInfo}
							/>
						) : 
							( this.state.searchResults.length > 0 && 
								<AllBooksSearchResult
								allBooks={this.state.searchResults}
								handleBtnDetailBook={this.handleBtnDetailBook}
							/>)
						)
					)
				}

			</div>
		)
	}
}
