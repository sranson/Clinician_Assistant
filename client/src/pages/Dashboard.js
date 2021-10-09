import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';

const Dashboard = () => {
    const { data } = useQuery(QUERY_ME);
    const clients = data?.me.clients || [];
    // console.log(clients);

    clients.forEach((cl) => {
        console.log(cl.firstName, cl.lastName);
    })

    return (
        <div>
            <h4>Clients:</h4>
        </div>
    )
}


export default Dashboard;