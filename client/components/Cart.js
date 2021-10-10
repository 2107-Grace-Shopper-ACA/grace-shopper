import React from 'react'
import {connect} from 'react-redux'

const Cart = () => {
    return (
        <div>
            Cart is shown here
        </div>
    )
}

const mapState = state => {
    return {
        state
    }
}

export default connect(mapState)(Cart)