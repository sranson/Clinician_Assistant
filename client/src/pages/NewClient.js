import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import Select from 'react-dropdown-select';
import { ADD_CLIENT } from '../utils/mutations';
import { QUERY_ALL_PCPS } from '../utils/queries'
import CreateGoal from '../components/CreateGoal';

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
    const [showGoalInput, setShowGoalInput] = useState(false);
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
                POC_end_date: formState.POC_end_date
              }
            });
        } catch (e) {
            console.error(e);
        }
    };

    const addGoals = () => {
      console.log('CLICKED!');
      setShowGoalInput(true)
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
                        <Select
                            placeholder="Client PCP"
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


              {/* GOAL #1 */}
              <div className="row">
                  <div className="col-md-12">
                    <label>Goal #1:</label>
                    <input
                      className="form-input"
                      placeholder="The client will...."
                      name="goal1"
                      type="text"
                      value={formState.goal1}
                      onChange={handleChange}
                    />
                  </div>
              </div>

            {/* GOAL #2 */}
              <div className="row">
                  <div className="col-md-12">
                    <label>Goal #2:</label>
                    <input
                      className="form-input"
                      placeholder="The client will...."
                      name="goal2"
                      type="text"
                      value={formState.goal2}
                      onChange={handleChange}
                    />
                  </div>
              </div>

              {/* GOAL #3 */}
              <div className="row">
                  <div className="col-md-12">
                    <label>Goal #3:</label>
                    <input
                      className="form-input"
                      placeholder="The client will...."
                      name="goal3"
                      type="text"
                      value={formState.goal3}
                      onChange={handleChange}
                    />
                  </div>
              </div>

                <button className="btn btn-block btn-primary" style={{ cursor: 'pointer' }} type="submit"> Submit</button>
              </form>
            )}

                {/* ADD GOALS BUTTON */}
                {/* <div style={{ marginBottom: "2%", marginTop: "2%" }}>
                  <button 
                    className="btn btn-info" 
                    onClick={addGoals}
                  >
                    Add Goals
                  </button>
                </div> */}

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