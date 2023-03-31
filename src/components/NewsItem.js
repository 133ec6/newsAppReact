import React from 'react'




export default function NewsItem(props) {
  return (
    <div>
      <div className="card" style={{ width: "18rem" }}>
        <span class="position-absolute top-0 translate-middle badge rounded-pill bg-dark" style={{ left: "95%" }}>
          {props.source}
          <span class="visually-hidden">unread messages</span>
        </span>
        <img src={props.imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.description} </p>
          <p className="card-text"><small className="text-body-secondary">By {props.author ? props.author : "unknown"} on {(new Date(props.date)).toDateString()}</small></p>
          <a href={props.newsUrl} target='_blank' rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
        </div>
      </div>
    </div>
  )
}




