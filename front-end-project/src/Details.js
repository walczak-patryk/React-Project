import React, { PropTypes} from 'react';
import Booking from './Booking'
import './test.css'

class Details extends React.Component {


    render() {
        return (
            <div>
                {`XD ${this.props.match.params.id}`}
            </div>
        )
    }
}

export default Details