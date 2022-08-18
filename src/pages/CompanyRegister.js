import React, { Fragment, useContext, useState } from 'react'
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { MainContext } from '../route/AppRoute';

export const CompanyRegister = () => {
    const {setUser, setRole} = useContext(MainContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [image, setImage] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loggedIn, setloggedIn] = useState(false);

    const RegisterformSubmit = (e) => {

        e.preventDefault();

        let formData = new FormData();
        formData.append('image', image);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('c_password', cpassword);
        formData.append('phone', phone);
        formData.append('address', address);

        // const data = {
        //     name: name,
        //     email: email,
        //     phone: phone,
        //     address: address,
        //     image: image,
        //     password: password,
        //     c_password: cpassword
        // }
        axios.post('/registercompany', formData)
            .then(function (response) {
                localStorage.setItem('token', response.data.data.token);
                setRole(response.data.data.role)
                setUser(response.data.user)

                setloggedIn(true);
            })
            .catch(function (error) {
                setMessage(error.response.data.message);
            });
    }
    if (loggedIn === true) {
        return <Navigate to={'/'} />
    }
    if (localStorage.getItem('token')) {
        return <Navigate to={'/'} />
    }
        /// Show Error Message 
        let error = "";
        if (message) {
            error = (
                <div>
                    <div class="alert alert-danger" role="alert" >
                        {message}
                    </div>
                </div>
            )
        } // end error message 
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
                                    Register to HRMS
                                </h1>
                                <div className='login-main-contentform-data-formbox'>
                                    <Form onSubmit={RegisterformSubmit}>
                                    {error}
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>User Name</Form.Label>
                                            <Form.Control onChange={(e) => setName(e.target.value)} type="text" placeholder="username" />

                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" />

                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Phone</Form.Label>
                                            <Form.Control onChange={(e) => setPhone(e.target.value)} type="number" placeholder="Enter number" />

                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>address</Form.Label>
                                            <Form.Control onChange={(e) => setAddress(e.target.value)} type="text" placeholder="Enter address" />

                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" aria-hidden='true' />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Confirm Password</Form.Label>
                                            <Form.Control onChange={(e) => setCPassword(e.target.value)} type="password" placeholder=" Confirm Password" aria-hidden='true' />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Profile Pic</Form.Label>
                                            <Form.Control onChange={(e) => setImage(e.target.files[0])} type="file" />

                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicPassword">

                                            <Form.Control className="bg-primary text-white" variant="primary" type="submit" />
                                        </Form.Group>


                                    </Form>
                                    <a className='text-muted float-end' href='#'>Already Register ? Login</a>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

