import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { REMOVE_CLIENT } from '../../utils/mutations'
import { QUERY_SINGLE_PCP } from '../../utils/queries';
import { BsTrash, BsFillPencilFill } from "react-icons/bs";

const Modal = require('../Modal')

const ClientCard = (props) => {    
    // console.log(props);

    // const [goalModal, setgoalModal] = useState(False);

    const clientPCP = useQuery(QUERY_SINGLE_PCP, {
         variables: { pcpId:  props.PCP },
    })
    let pcpFirst = clientPCP.data?.onePCP.pcpFirstName || '';
    let pcpLast = clientPCP.data?.onePCP.pcpLastName || '';


    const [removeClient] = useMutation(REMOVE_CLIENT);
    
    const deleteClient = async () => {
        try {
            const removed = await removeClient({
                variables: {
                    clientId: props.clientId
                }
            })
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    // TO DO: HAVE A MODAL POP UP TO SHOW INPUT FIELD TO ENTER GOALS FOR THE CLIENT
    const showModal = () => {
        console.log(`Client: ${props.fullName} --- Client GraphQL ID: ${props.clientId}`)
    }

    return (
        <div>
            <div className="card" style={{width: "24rem", height: "24rem" ,marginLeft: "2%"}}>
                <div className="card-header" style={{ display: 'flex', justifyContent: "space-between" }}>
                    <b>{props.fullName}</b>
                        {/* <BsFillPencilFill /> */}
                        <BsTrash onClick={deleteClient} />
                </div>
                <ul className="list-group list-group-flush" style={{ paddingLeft: "2%", paddingTop: "4%" ,listStyleType: "none" }}>
                        <li className="list-group-item"><b>DOB:</b> {props.DOB}</li>
                        <li className="list-group-item"><b>Member ID:</b> {props.memberId}</li>
                        <li className="list-group-item"><b>Payor Source:</b> {props.payor}</li>
                        <li className="list-group-item"><b>PCP:</b> {`${pcpFirst} ${pcpLast}`}</li>
                        <li className="list-group-item"><b>Service Time:</b> {props.sessionTime}</li>
                        <li className="list-group-item"><b>Evaluation:</b> {props.evalDate}</li>
                        <li className="list-group-item"><b>POC Dates:</b> {props.POCdates}</li>
                        <li className="list-group-item"><b>Auth Dates:</b> {props.authDates}</li>
                        <li className="list-group-item"><b>Approved Units:</b> {props.units}</li>
                </ul>
                <div style={{ display: "flex", justifyContent: "space-evenly" }} className="row">
                    <div>
                            <button type="button" className="btn btn-lg btn-info m-2" onClick={showModal}>Add Goals</button>
                    </div>
                    
                    <div>
                        <button type="button" className="btn btn-lg btn-info m-2">New Note</button>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default ClientCard;