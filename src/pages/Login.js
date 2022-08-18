import React, { Fragment, useContext, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { MainContext } from '../route/AppRoute';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Login = () => {
    const { setUser, setRole } = useContext(MainContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loggedIn, setloggedIn] = useState(false)

    const formSubmit = (e) => {
        e.preventDefault();

        const data = {
            email: email,
            password: password
        }
        axios.post('/login', data)
            .then(function (response) {
                localStorage.setItem('token', response.data.data.token);
                setRole(response.data.data.role)
                setUser(response.data.user)


                setloggedIn(true);
            })
            .catch(function (error) {
                setMessage(error.response.data.message);
                toast.error(message);
            });
    }
    if (loggedIn === true) {
        return <Navigate to={'/'} />
    }
    if (localStorage.getItem('token')) {
        return <Navigate to={'/'} />
    }

   
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
                                    Login to HRMS
                                </h1>
                                <div className='login-main-contentform-data-formbox'>
                                    <Form onSubmit={formSubmit}>
                                        
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" />

                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" aria-hidden='true' />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                            <Form.Check type="checkbox" label="remember" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicPassword">

                                            <Form.Control className="bg-primary text-white" variant="primary" type="submit" />
                                        </Form.Group>


                                    </Form>
                                    <Link className='text-muted float-end' to='/forget'>Forget Password?</Link>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </Fragment>
    )
}
