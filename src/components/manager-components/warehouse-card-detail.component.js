import React, { Component } from 'react'
import { MiniUsersTable } from '../user-components/users-table.component'
import Chart from 'react-google-charts'

class WarehouseCardDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        console.log(this.props.data)
        const working_user = this.props.data.staffs.map((user) => {
            return {
                ...user,
                id: user.user_id
            }
        })
        console.log('working', working_user)

        const used = this.props.data.usedSpace
        const data = [
            ['Type', 'Space'],
            ['Used Space', used * 100],
            ['Free Space', 100 - (used * 100)],
        ]
        return (
            <div>
                <div className='warehouse-more-detail card-warehouse-more-detail'>
                    <h4>{this.props.data.warehouseId} {this.props.data.name}</h4>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <div>
                            {
                                !this.props.isLoading &&
                                <div style={{ backgroundColor: { fill: 'transparent' },marginBottom: 15 }}>
                                    <Chart
                                        width={'500px'}
                                        height={'200px'}
                                        chartType="PieChart"
                                        loader={<div>Loading Chart</div>}
                                        data={data}
                                        options={{
                                            title: 'Parcels in Storage (Percent)',
                                        }}

                                    />
                                </div>
                            }
                            <div className='detail-card'>
                                <p><strong>Number of Parcels : </strong> {this.props.data.numberOfParcels.all}</p>
                                <p><strong>Number of Picked Parcels : </strong> {this.props.data.numberOfParcels.pickedUp}</p>
                                <p><strong>Number of Stored Parcels : </strong> {this.props.data.numberOfParcels.stored}</p>
                                <p><strong>Number of Exported Parcels : </strong> {this.props.data.numberOfParcels.exported}</p>
                                <p><strong>Manager ID : </strong> {this.props.data.managerId}</p>
                                <p><strong>Status : </strong> {this.props.data.status === 'available' && 'open'}</p>
                                {
                                    this.props.data.address ?
                                    <div>   
                                        <p><strong>Address : </strong> {this.props.data.address.address},</p>
                                        <p><strong>City : </strong> {this.props.data.address.city}, <strong>Country : </strong>{this.props.data.address.country}</p>
                                    </div> :
                                    <p><strong>Address : </strong> - </p>
                                }
                                
                            </div>
                        </div>
                        <div>
                            <MiniUsersTable users={working_user} />
                        </div>
                    </div>


                </div>
            </div>
        )
    }

}


export default WarehouseCardDetail