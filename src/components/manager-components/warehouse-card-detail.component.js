import React, {Component} from 'react'
import { connect } from 'react-redux'
import { MiniUsersTable } from '../user-components/users-table.component'
import WarehouseService from '../../services/warehouse-service'

class WarehouseCardDetail extends Component {
    constructor(props){
        super(props)
        this.state = {
            allUser: [],
            warehouseData: {},
            isLoading: true,
        }
    }

    componentDidMount() {
        //WarehouseService.getWarehouseById(this.props.warehouseId).then
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