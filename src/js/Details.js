import React, { PropTypes } from 'react';
import '../css/Details.css'
import { withRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

class Details extends React.Component {

  render() {

    const { data, itemType } = this.props

    const DetailsView = (
      itemType === "cars" ? <div>
        <div>Car id: {data.id}</div>
        <div>Car name: {data.name}</div>
        <div>Car is active: {data.active}</div>
      </div> : itemType === "flat" ? <div>
        Error flat
        </div> : itemType === "parking" ? <div>
            Error parking
        </div> : <div>
              Error other
        </div>
    )
    return (
      <div className="card-body">
        <div className="ElementDetails">
          Sadly this endpoint has not been implemented!
        </div>
      </div>
    )

  }
}

export default withRouter(Details)