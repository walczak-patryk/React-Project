import React, { PropTypes } from 'react';
import './Details.css'
import { withRouter } from "react-router-dom";

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
      <div className="WrapperDetails">
        <div className="ElementDetails">
          {DetailsView}
        </div>
      </div>
    )

  }
}

export default withRouter(Details)