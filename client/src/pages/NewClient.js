import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_CLIENT } from '../utils/mutations';


const NewClient = () => {
    const [formState, setFormState] = useState({
        firstName: '',
        lastName: '',
        DOB: '',
        insuranceId: '',
        payorSource: '',
        pcpFirstName: '',
        pcpLastName: '',
        pcpNPI: '',
        pcpPhoneNumber: '',
        pcpFaxNumber: '',
        serviceStartTime: '',
        serviceEndTime: '',
        POC_start_date: '',
        POC_end_date: ''
    });
    const [addClient, { error, data }] = useMutation(ADD_CLIENT);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await addClient({
                variables: {...formState },
            });
        } catch (e) {
            console.error(e);
        }
    };

    const addGoals = () => {
      console.log('USER WANTS TO ADD GOALS TO CLIENT');
    }

    return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Create New Client</h4>
          <div className="card-body">
            {data ? (
              <p>
                Client added successfully!
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <input
                      className="form-input"
                      placeholder="Client First Name"
                      name="firstName"
                      type="text"
                      value={formState.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      className="form-input"
                      placeholder="Client Last Name"
                      name="lastName"
                      type="text"
                      value={formState.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                      <label className="form-label">Client DOB:</label>
                      <input
                        className="form-input"
                        name="DOB"
                        type="date"
                        value={formState.DOB}
                        onChange={handleChange}
                      />
                    </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <input
                      className="form-input"
                      placeholder="Insurance ID#"
                      name="insuranceId"
                      type="text"
                      value={formState.insuranceId}
                      onChange={handleChange}
                    />
                  </div>
                <div className="col-md-6">
                    <input
                      className="form-input"
                      placeholder="Payor Source"
                      name="payorSource"
                      type="text"
                      value={formState.payorSource}
                      onChange={handleChange}
                  />
                </div>
              </div>


              <div className="row">
                    <div className="col-md-6">
                      <label className="form-label">Plan of Care Start Date</label>
                        <input
                          className="form-input"
                          name="POC_start_date"
                          type="date"
                          value={formState.POC_start_date}
                          onChange={handleChange}
                        />
                    </div>

                      <div className="col-md-6">
                          <label className="form-label">Plan of Care End Date</label>
                            <input
                              className="form-input"
                              name="POC_end_date"
                              type="date"
                              value={formState.POC_end_date}
                              onChange={handleChange}
                            />
                      </div>
                </div>

              <div className="row">
                    <div className="col-md-6">
                      <label className="form-label">Session Start Time</label>
                        <input
                          className="form-input"
                          name="serviceStartTime"
                          type="time"
                          value={formState.serviceStartTime}
                          onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Session End Time</label>
                        <input
                          className="form-input"
                          name="serviceEndTime"
                          type="time"
                          value={formState.serviceEndTime}
                          onChange={handleChange}
                        />
                    </div>
              </div>

                <button className="btn btn-block btn-primary" style={{ cursor: 'pointer' }} type="submit"> Submit</button>
              </form>
            )}

                <div style={{ marginBottom: "2%", marginTop: "2%" }}>
                  <button className="btn btn-info" onClick={addGoals}>Add Goals</button>
                </div>
            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
    )


}


export default NewClient;