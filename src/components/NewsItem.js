import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    
    let {title,description,imageUrl,newsUrl,author,date,source} = this.props;
    return (
        
      <div>
        <div className="card" style={{width: "18rem"}}>
        <span class="position-absolute top-0 translate-middle badge rounded-pill bg-dark" style={{left:"95%"}}>
    {source}
    <span class="visually-hidden">unread messages</span>
  </span>
            <img src={imageUrl} className="card-img-top" alt="..."/>  
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description} </p>
                <p className="card-text"><small className="text-body-secondary">By {author?author:"unknown"} on {(new Date(date)).toDateString()}</small></p>
                <a href={newsUrl} target='_blank' rel="noreferrer"  className= "btn btn-sm btn-dark">Read More</a>
            </div>
        </div>
      </div>
    )
  }
}
