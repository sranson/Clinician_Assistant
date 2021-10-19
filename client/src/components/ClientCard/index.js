import React from 'react';


const ClientCard = (props) => {
    return (
        <div>
            <div className="card" style={{width: "24rem", height: "24rem" ,marginLeft: "2%"}}>
                <div className="card-header">
                    <b>{props.fullName}</b>
                </div>
                <ul className="list-group list-group-flush" style={{ paddingLeft: "2%", paddingTop: "4%" ,listStyleType: "none" }}>
                        <li className="list-group-item"><b>DOB:</b> {props.DOB}</li>
                        <li className="list-group-item"><b>Member ID:</b> {props.memberId}</li>
                        <li className="list-group-item"><b>Payor Source:</b> {props.payor}</li>
                        <li className="list-group-item"><b>PCP:</b> Placeholder</li>
                        <li className="list-group-item"><b>Service Time:</b> {props.sessionTime}</li>
                        <li className="list-group-item"><b>POC Dates:</b> {props.POCdates}</li>
                        <li className="list-group-item"><b>POC Dates:</b> {props.authDates}</li>
                </ul>
                <div style={{ display: "flex", justifyContent: "space-evenly" }} className="row">
                    <div>
                        <button type="button" className="btn btn-lg btn-info m-2">Add Goals</button>
                    </div>
                    
                    <div>
                        <button type="button" className="btn btn-lg btn-info m-2">New Note</button>
                    </div>
                </div>

                <div style={{ display: "flex", justifyContent: "center", paddingTop: "2%" }}>
                    <button type="button" class="btn btn-md btn-danger">Delete Client</button>
                </div>
            </div>
        </div>
    )
}



export default ClientCard;