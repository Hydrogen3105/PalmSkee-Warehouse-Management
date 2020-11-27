import React from 'react'

function StaffProfile({ user }) {
    return (
        <div className='admin-profile' style={{height: 250}}>
            <div style={{textAlign:'center'}}>
                <h4> {user.payload[0].userId} </h4>
                <h5> {user.payload[0].firstName} </h5>
                <p> {user.payload[0].position === 'staff' && 'Warehouse Staff'} </p>
            </div>
        </div>
    )
}

export default StaffProfile