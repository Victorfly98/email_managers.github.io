import React, { Component } from 'react'

import { connect } from 'react-redux'

class EmailMonitoring extends Component {
    
    componentDidMount = () => {
        
    }

    render() {
        return (
            <div>
                EmailMonitoring
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        
    }
}

const mapDispatchToProps = dispatch => {
    return {
       
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EmailMonitoring)
