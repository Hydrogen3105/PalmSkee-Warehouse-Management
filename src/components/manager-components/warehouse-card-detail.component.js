import React, {Component} from 'react'
import { connect } from 'react-redux'

class WarehouseCardDetail extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    componentDidMount() {

    }

    render () {
        return (
            <div>
                <div className='warehouse-more-detail card-warehouse-more-detail'>
                    <h4>{this.props.warehouseId}</h4>
                    <div className='detail-card'>

                    </div>

                </div>
            </div>
        )
    }

}

function mapStateToProp(state) {
    const { user } = state.auth
    const { warehouseId } = state.warehouse

    return {
        user,
        warehouseId,
    }
}

export default connect(mapStateToProp)(WarehouseCardDetail)