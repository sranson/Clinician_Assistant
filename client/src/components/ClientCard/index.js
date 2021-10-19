import React from 'react';


const ClientCard = (props) => {
    return (
        <div>
            <div className="card" style={{width: "23rem", marginLeft: "3%"}}>
                <div className="card-header">
                    {props.fullName}
                </div>
                <ul className="list-group list-group-flush" >
                        <li className="list-group-item">DOB: {props.DOB}</li>
                        <li className="list-group-item">Member ID: {props.memberId}</li>
                        <li className="list-group-item">Payor Source: {props.payor}</li>
                        <li className="list-group-item">Service Time: {props.sessionTime}</li>
                        <li className="list-group-item">POC Date: {props.POCdates}</li>
                </ul>
            </div>
        </div>
    )
}



export default ClientCard;