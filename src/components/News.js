import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


export default class News extends Component {
    static defaultProps = {
        country: "in",
        pageSize: 8,
        category: "general"
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            noOfPages: 0
        }
        let cat = this.props.category;

        cat = cat.charAt(0).toUpperCase() + cat.slice(1);

        document.title = `${cat}-NewsApp`;
    }

    async componentDidMount() {

        this.setState({ loading: true, articles: [] });
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e8f9faeffa1f4916a5b13be8cabc6c91&pageSize=${this.props.pageSize}`;

        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({ loading: false, articles: parsedData.articles, noOfPages: parsedData.totalResults / this.props.pageSize })
    }
    async updateNews() {
        this.setState({ loading: true, articles: [] });
        console.log(this.state.page);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e8f9faeffa1f4916a5b13be8cabc6c91&page=${this.state.page}&pageSize=${this.props.pageSize}`;

        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({ loading: false, articles: parsedData.articles });
    }
    handlePrev = async () => {
        
       await this.setState({ page: this.state.page - 1 })
        this.updateNews();
    }
    handleNext = async () => {
        
        await this.setState({ page: this.state.page + 1 })
        this.updateNews();

    }

    render() {

        return (
            <div className="container my-3">
                <h1 className='text-center my-3'>Top Headlines</h1>
                {/* {this.state.loading && <Spinner/>} */}

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                >
                    <div className="row">

                        {
                            this.state.articles.map((article) => {
                                return <div className="col text-center mx-4 my-3" key={article.url}>
                                    <NewsItem titile={article.title ? article.title.slice(0, 45) : article.title} description={article.description ? article.description.slice(0, 88) : article.description} imageUrl={article.urlToImage ? article.urlToImage : 'https://images.hindustantimes.com/tech/img/2023/03/28/1600x900/sunset_1679987142115_1679987149701_1679987149701.jpg'} newsUrl={article.url} author={article.author} date={article.publishedAt} source={article.source.name} />
                                </div>
                            })
                        }

                    </div>
                </InfiniteScroll>
                <div className="d-flex justify-content-between">
                    <button type="button" disabled={this.state.page <= 1} class="btn btn-dark" onClick={this.handlePrev}>&laquo; Prev</button>
                    <button type="button" disabled={this.state.page >= this.state.noOfPages} class="btn btn-dark" onClick={this.handleNext}>Next &raquo;</button>
                </div>
            </div>
        )
    }
}

