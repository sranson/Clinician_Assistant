import React from 'react';
import { useQuery } from '@apollo/client';
import Moment from 'react-moment';
import 'moment-timezone';
import { QUERY_THERAPIST_CLIENTS } from '../utils/queries';

const Dashboard = () => {
    const { data } = useQuery(QUERY_THERAPIST_CLIENTS);
    const clientArray = data?.clients.clients;
    // console.log(clientArray);

    if (clientArray) {
        clientArray.forEach((cl) => {
            let firstName = cl.firstName;
            let lastName = cl.lastName;
            let DOB = cl.DOB;
            // let insuranceId = cl.insuranceId;
            // let payor = cl.payorSource
            console.log(`${firstName} ${lastName} ${DOB}`);
        })
    }

    return (
        <div>
            <h4>Clients:</h4>
        </div>
    )
}


export default Dashboard;