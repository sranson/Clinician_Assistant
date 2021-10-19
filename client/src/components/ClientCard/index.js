import React from 'react';


const ClientCard = (props) => {
    return (
        <div>
            <div className="card" style={{width: "18rem"}}>
                <div className="card-header">
                    {props.fullName}
                </div>
                <ul className="list-group list-group-flush" style={{"listStyleType": "none" }}>
                    <li className="list-group-item">DOB: {props.DOB}</li>
                    <li className="list-group-item">Member ID: {props.memberId}</li>
                    <li className="list-group-item">Payor Source: {props.payor}</li>
                </ul>
            </div>
        </div>
    )
}



export default ClientCard;