import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';

const Dashboard = () => {
    const { data } = useQuery(QUERY_ME);
    const clients = data?.me.clients || [];
    // console.log(clients);

    clients.forEach((client) => {
        console.log(client.firstName);
    })

    if (!clients) {
        return (
            <h4>
                You need to be logged in to see this. Use the navigation links above to
                sign up or log in!
            </h4>
        );
    }

    return (
        <div>
            <h1>Dashboard screen</h1>
        </div>
    )
}


export default Dashboard;