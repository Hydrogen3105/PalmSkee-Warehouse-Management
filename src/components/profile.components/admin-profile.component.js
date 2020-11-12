import React from 'react'

function AdminProfile({ user }) {
    return (
        <div className='admin-profile'>
            <div style={{textAlign:'center'}}>
                <h4> {user.payload[0].userId} </h4>
                <h5> {user.payload[0].firstName} </h5>
                <p> {user.payload[0].position === 'admin' && 'System Admin'} </p>
            </div>
        </div>
    )
}

export default AdminProfile