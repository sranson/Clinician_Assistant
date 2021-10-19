import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_THERAPIST_CLIENTS } from '../utils/queries';
import ClientCard from '../components/ClientCard';

const Dashboard = () => {

    const { data } = useQuery(QUERY_THERAPIST_CLIENTS);
    const clientArray = data?.clients.clients;
  
    if (clientArray !== undefined) {
        console.log(clientArray);
        return (
            <div className="row">
                {clientArray.map((cl) => {
                    return (
                            <div className="col-md-3">
                                <ClientCard 
                                    key={cl._id} 
                                    fullName={`${cl.firstName} ${cl.lastName}`} 
                                    DOB={cl.DOB} 
                                    memberId={cl.insuranceId} 
                                    payor={cl.payorSource} 
                                    sessionTime={`${cl.serviceStartTime} - ${cl.serviceEndTime}`}
                                    POCdates={`${cl.POC_start_date} = ${cl.POC_end_date}`}
                                />
                            </div>
                    )
                })}
            </div>
        )
    } else {
        return (
            <div>
                <h1>Clients:</h1>
            </div>
        )
    }

}


export default Dashboard;