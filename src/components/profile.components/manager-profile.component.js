import React from 'react'

function ManagerProfile({ user }) {
    return (
        <div className='admin-profile'>
            <div style={{textAlign:'center'}}>
                <h4> {user.payload[0].userId} </h4>
                <h5> {user.payload[0].firstName} </h5>
                <p> {user.payload[0].position === 'manager' && 'Warehouse Manager'} </p>
            </div>
        </div>
    )
}

export default ManagerProfile