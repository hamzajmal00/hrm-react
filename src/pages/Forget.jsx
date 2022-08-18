import React, { Fragment, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

export const Forget = () => {

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const formSubmit = (e) => {
        e.preventDefault();

        const data = {
            email: email
        }
        axios.post('/forget', data)
            .then(function (response) {
                setMessage(response.data.message);
                document.getElementById("forgetform").reset();
            })
            .catch(function (error) {
                setErrorMessage(error.response.data.message);
            });
    }
    /// Show Error Message 
    let error = "";
    if (message) {
        error = (
            <div>
                <div class="alert alert-success" role="alert" >
                    {message}
                </div>
            </div>
        )
    } else if(errorMessage){
        error = (
            <div>
                <div class="alert alert-danger" role="alert" >
                    {errorMessage}
                </div>
            </div>
        )
    }

    // end error message 
    return (
        <Fragment>
            <div className='login-main'>
                <div className='row'>
                    <div className='col-lg-5 col-md-6 col-sm-12'>
                        <div className='login-main-content'>
                            <a href='#' className='login-main-content-logsignup'>
                                <img src='/images/signup-logo.svg' />
                            </a>
                            <div className='login-main-content-data'>

                                <div className='login-main-content-data-text'>
                                    <h1>Welcome to HRMS</h1>
                                    <p>
                                        Lorem ipsum is a placeholder text commonly used to
                                        demonstrate the
                                        visual form of a
                                        document or a typeface without relying on meaningful content.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-6 col-sm-12'>
                        <div className='login-main-contentform'>
                            <div className='login-main-contentform-data'>
                                <h1>
                                    Email to Reset Password
                                </h1>
                                <div className='login-main-contentform-data-formbox'>
                                    <Form onSubmit={formSubmit} id="forgetform">
                                        {error}
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" />

                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicPassword">

                                            <Form.Control className="bg-primary text-white" variant="primary" type="submit" />
                                        </Form.Group>


                                    </Form>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
