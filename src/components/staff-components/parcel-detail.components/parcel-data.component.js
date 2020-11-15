import React from 'react'

export default function ParcelData({ data }) {
    const date = data.receivedDate
    return (
        <div>
            <div className='parcel-detail parcel-detail-sizing'>
                <h3>Parcel Detail location</h3>
                <br/>
                <div style={{
                        display: "flex",
                        flexDirection: "row",
                    }}
                >
                    <div style={{fontSize: 20, marginRight: 150}}>
                        <p><b>Parcel ID : </b> {data.parcelId}</p>
                        <p><b>Sender : </b> {data.parcelId}</p>
                        <p><b>Recieved Date : </b> {date}</p>
                        <p><b>Exported Date : </b> {data.exportedDate ? data.exportedDate : 'N/A'} </p>
                        <p><b>Size : </b> {data.width} x {data.length} x {data.height} mm<sup>3</sup> </p>
                        <p><b>Weight : </b> {data.weight} Kg.</p>
                        
                    </div>
                    <div style={{fontSize: 30}} className='center-ver-hori'>
                        <p><b>Status : </b> {data.latestStatus}</p>
                    </div>
                </div>
                

            </div>
            <div className='parcel-detail'>
                <h3>Parcel Location</h3>
                <div style={{fontSize: 20}}>
                    <p><b>{data.location}</b></p>
                </div>
            </div>
        </div>
    )
} 