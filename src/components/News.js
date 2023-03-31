import React from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState } from 'react';
import { useEffect } from 'react';



export default function News(props) {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState('true')
    const [page, setPage] = useState(1)

    const [totalResults, setTotalResults] = useState(0)

    const updateNews = async()=> {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);

        props.setProgress(30);
        let data = await fetch(url);
        let parsedData = await data.json()

        props.setProgress(70);
        setLoading(false);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);

        props.setProgress(100);

    }

    useEffect(() => {

        updateNews();
        
        // eslint-disable-next-line
    }, [])
    
    const fetchMoreData = async () => {
        setPage(page + 1);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
    }
    return (
        <div className="container my-3" >
            <h1 className='text-center' style={{ margin: "93px auto 24px auto" }}>Top Headlines</h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
                style={{ overflow: "hidden" }}

            >
                <div className='row' >

                    {


                        articles.map((article, key) => {
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

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

News.defaultProps = {
    name: "Rahul",
    eyeColor: "deepblue",
    age: "45"
}
