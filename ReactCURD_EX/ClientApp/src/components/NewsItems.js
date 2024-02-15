import React, { Component } from "react"

export class NewsItems extends Component {

    render() {
        let { title, description, imageurl, newsurl, author, date, source } = this.props;
        return (
            <>
                <div>
                    <div> NewsItems</div>
                    <div className="card">
                        {/* add badge at top of the news */}
                        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ zIndex: "1", left: "88%" }}>{source}</span>
                        <img src={!imageurl ? "https://swarajya.gumlet.io/swarajya/2017-01/18f21166-bc12-46d3-b432-3b1046e1ccb8/815e95fc-3864-4d6d-a134-c05286cc180e.jpg" : imageurl} className="card-img-top" alt="..." />
                        <div className="card-body" style={{ marginTop: "60px" }}>
                            <h5 className="card-title" >{title}...</h5>
                            <p className="card-text">{description}...</p>
                            <div className="card-footer">
                                {/* add news author name and date */}
                                <small className="text-muted">By {!author ? "Unknown" : author} and {date} </small>
                            </div>
                            <a href={newsurl} target="-blank" className="btn btn-sm btn-dark">Read More</a>
                        </div>

                    </div></div>

            </>
        )
    }
}

export default NewsItems