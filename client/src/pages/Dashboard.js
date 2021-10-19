import React from 'react';
import { useQuery } from '@apollo/client';
import moment from 'moment';
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
                            <div className="col-md-4">
                                <ClientCard 
                                    key={cl._id} 
                                    fullName={`${cl.firstName} ${cl.lastName}`} 
                                    DOB={moment(cl.DOB).format('L')} 
                                    memberId={cl.insuranceId} 
                                    payor={cl.payorSource} 
                                    sessionTime={`${moment(cl.serviceStartTime, 'HH:mm').format('hh:mm a')} - ${moment(cl.serviceEndTime, 'HH:mm').format('hh:mm a')}`}
                                    POCdates={`${moment(cl.POC_start_date).format('L')} - ${moment(cl.POC_end_date).format('L')}`}
                                    authDates={`${moment(cl.authStart).format('L')} - ${moment(cl.authEnd).format('L')}`}
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