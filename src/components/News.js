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
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title =  ` NewsMonkey`;
    }

    async updateNews() {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d093053d72bc40248998159804e0e67d&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false, 
        })

    }
    async componentDidMount() {
        this.updateNews();
    }


    fetchMoreData = async () => {  
        this.setState({page: this.state.page + 1})
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d093053d72bc40248998159804e0e67d&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults
        })
      };

   
    render() {

        return (
            <div className="container my-3">
                <h1 className='text-center my-3'>Top Headlines</h1>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner/>}
                    style={{overflow:"hidden" }}

                > 
                    <div className='row' >

                        {
                            
                            
                            this.state.articles.map((article,key) => {
                                return <div className="col text-center mx-4 my-3" key={key}>
                                    <NewsItem titile={article.title ? article.title.slice(0, 45) : article.title} description={article.description ? article.description.slice(0, 88) : article.description} imageUrl={article.urlToImage ? article.urlToImage : 'https://images.hindustantimes.com/tech/img/2023/03/28/1600x900/sunset_1679987142115_1679987149701_1679987149701.jpg'} newsUrl={article.url} author={article.author} date={article.publishedAt} source={article.source.name} />
                                </div>
                            })
                        }

                    </div>
                </InfiniteScroll>
            </div>
        )
    }
}

