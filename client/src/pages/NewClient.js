import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_CLIENT } from '../utils/mutations';


const NewClient = () => {
    const [formState, setFormState] = useState({
        firstName: '',
        lastName: '',
        DOB: ''
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
        console.log(formState);

        try {
            const { data } = await addClient({
                variables: {...formState },
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
                <input
                  className="form-input"
                  placeholder="Client First Name"
                  name="firstName"
                  type="text"
                  value={formState.firstName}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Client Last Name"
                  name="lastName"
                  type="text"
                  value={formState.lastName}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Client Last Name"
                  name="DOB"
                  type="date"
                  value={formState.DOB}
                  onChange={handleChange}
                />
                <button
                  className="btn btn-block btn-primary"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Submit
                </button>
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