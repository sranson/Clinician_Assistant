import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import moment from 'moment';
import Select from 'react-dropdown-select';
import { ADD_CLIENT } from '../utils/mutations';
import { QUERY_ALL_PCPS } from '../utils/queries'


const NewClient = () => {
const primaries = useQuery(QUERY_ALL_PCPS);

class Doctor {
  constructor(key, label, value){
    this.key = key;
    this.label = label;
    this.value = value;
  }
}

let pcpOptions = []

if (primaries.data !== undefined) {
  let peds = primaries.data?.pcps;
      peds.forEach((doc) => {
      let docFullName = `${doc.pcpFirstName} ${doc.pcpLastName}`
      let pediatrician = new Doctor(doc._id, docFullName, doc._id)
      pcpOptions.push(pediatrician)
    })
}

    const [pcpState, setPcpState] = useState({ PCP: ""});
    const [formState, setFormState] = useState({
        firstName: '',
        lastName: '',
        DOB: '',
        insuranceId: '',
        payorSource: '',
        serviceStartTime: '',
        serviceEndTime: '',
        POC_start_date: '',
        POC_end_date: '',
        authStart: '',
        authEnd: '',
        units: '',
        evalDate: ''
    });


    const [addClient, { error, data }] = useMutation(ADD_CLIENT);
    // console.log(formState);
    // console.log(pcpState);

    const setPcpValue = (val) => {
      let value = val[0].value;
      setPcpState({PCP: value});
    };

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
              variables: {
                firstName: formState.firstName,
                lastName: formState.lastName,
                DOB: formState.DOB,
                insuranceId: formState.insuranceId,
                payorSource: formState.payorSource,
                PCP: pcpState.PCP,
                serviceStartTime: formState.serviceStartTime,
                serviceEndTime: formState.serviceEndTime,
                POC_start_date: formState.POC_start_date,
                POC_end_date: formState.POC_end_date,
                authStart: formState.authStart,
                authEnd: formState.authEnd,
                units: formState.units,
                evalDate: formState.evalDate
              }
            });
        } catch (e) {
            console.error(e);
        }
    };


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
                    <label className="form-label">Pediatrician:</label>
                        <Select
                            placeholder="Pediatrician"
                            options= {pcpOptions}
                            onChange={(val) => setPcpValue(val)}
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
                      <label className="form-label">Authorization Start Date</label>
                        <input
                          className="form-input"
                          name="authStart"
                          type="date"
                          value={formState.authStart}
                          onChange={handleChange}
                        />
                    </div>

                      <div className="col-md-6">
                          <label className="form-label">Authorization End Date</label>
                            <input
                              className="form-input"
                              name="authEnd"
                              type="date"
                              value={formState.authEnd}
                              onChange={handleChange}
                            />
                      </div>
                </div>

                <div className="row">

                      <div className="col-md-6">
                        <label className="form-label">Evaluation Date</label>
                          <input
                            className="form-input"
                            name="evalDate"
                            type="date"
                            value={formState.evalDate}
                            onChange={handleChange}
                          />
                      </div>

                    <div className="col-md-6">
                      <label className="form-label"># of Approved Units</label>
                      <input
                        className="form-input"
                        name="units"
                        type="number"
                        value={formState.units}
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