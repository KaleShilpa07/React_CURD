import React, { Component } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
class News extends Component {
    static defaultProps = {
        country: "in",
        pageSize: 5,
        category: "sports",
    };

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
        apiKey: PropTypes.string.isRequired,
        setProgress: PropTypes.func.isRequired,
    };

    state = {
        articles: [],
        loading: true,
        page: 1,
        totalResults: 0,
    };

    componentDidMount() {
        this.UpdateNews();
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            prevProps.category !== this.props.category ||
            prevState.page !== this.state.page
        ) {
            this.UpdateNews();
        }
    }

    //CapitalizeFirstLetter = (str) => {
    //    // Check if str is a string
    //    if (typeof str !== 'string' || str.length === 0) {
    //        return ''; // Or handle the error accordingly
    //    }
    //    return str.charAt(0).toUpperCase() + str.slice(1);
    //};

    async UpdateNews() {
        this.props.setProgress(0);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        try {
            const response = await fetch(url);
            const data = await response.json();
            this.setState({
                articles: data.articles,
                totalResults: data.totalResults,
                loading: false,
            });
            this.props.setProgress(100);
        } catch (error) {
            console.error("Error fetching news:", error);
            this.setState({ loading: false });
        }
    }

    handlePrevClick = () => {
        this.setState((prevState) => ({
            page: prevState.page - 1,
        }));
    };

    handleNextClick = () => {
        this.setState((prevState) => ({
            page: prevState.page + 1,
        }));
    };

    render() {
        return (
            <div className="container my-3">

                
                <h1 className="text-center" style={{ marginTop: "0px" }}>
                    Top {(this.props.category)} News...
                    <div style={{ position: "fixed", top: "10px", left: "70px", zIndex: "999" }}>
                        <Link
                            to="/Navbar"
                            className="btn btn-primary border rounded-2"
                        >
                            <strong>Go News Gallary</strong>
                        </Link> 
                    </div>
                    </h1>
                {this.state.loading && <Spinner />}
                <div className="row">
                    {this.state.articles.map((element) => (
                        <div className="col-md-4" key={element.url}>
                            <NewsItems
                                newsurl={element.url}
                                title={element.title.slice(0, 20)}
                                description={element.description}
                                imageurl={element.urlToImage}
                                author={element.author}
                                date={element.publishedAt}
                                source={element.source.name}
                            />
                        </div>
                    ))}
                </div>
                <div className="container d-flex justify-content-between my-3">
                    <button
                        type="button"
                        disabled={this.state.page <= 1}
                        className="btn btn-dark"
                        onClick={this.handlePrevClick}
                    >
                        &larr; Prev
                    </button> 
                    <button
                        type="button"
                        disabled={
                            this.state.page + 1 >
                            this.state.totalResults / this.props.pageSize
                        }
                        className="btn btn-dark"
                        onClick={this.handleNextClick}
                    >
                        Next &rarr;
                    </button>
                </div>
            </div>
        );
    }
}

export default News;
