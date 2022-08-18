import React, { Fragment, useContext, useState } from 'react'
import { MainContext } from '../route/AppRoute';
import Offcanvas from 'react-bootstrap/Offcanvas';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Canvas = () => {
    const { role, showCanvas, setShowCanvas } = useContext(MainContext)
    const handleClose = () => setShowCanvas(false);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const employeeInvite = (e) => {
        e.preventDefault();



        const data = {

            email: email,

        }
        axios.post('/inviteemployee', data)
            .then(function (response) {
                setMessage(response.data.message);
                toast.success(response.data.message)
                document.getElementById("forgetform").reset();
            })
            .catch(function (error) {
                console.log(error.response.data.message);
            });
    }
    const orgInvite = (e) => {
        e.preventDefault();

        const data = {

            email: email,

        }
        axios.post('/inviteorg', data)
            .then(function (response) {
                setMessage(response.data.message);
                toast.success(response.data.message)
                document.getElementById("forgetform").reset();

            })
            .catch(function (error) {
                setErrorMessage(error.response.data.message);
            });
    }
   

 
    let formOpen;
    let canHeader;
    if (role === 'admin') {
        canHeader = "Organization";
        formOpen = <form onSubmit={orgInvite} id='forgetform'>
         
            <label for="email" class="form-label signup-label mt-3">Email</label>
            <div class="input-group mb-3">
                <input onChange={(e) => setEmail(e.target.value)} type="email" class="form-control" placeholder="Email address" aria-label="Email address" aria-describedby="button-addon2" id="email" name="email" required="" />
                <button class="btn btn-primary" type="submit" id="button-addon2">Send
                    Invitation</button>
            </div>
        </form>;
    } else {
        canHeader = "Empoyee";
        formOpen = <form onSubmit={employeeInvite} id='forgetform'>
           
            <label for="email" class="form-label signup-label mt-3">Email</label>
            <div class="input-group mb-3">
                <input onChange={(e) => setEmail(e.target.value)} type="email" class="form-control" placeholder="Email address" aria-label="Email address" aria-describedby="button-addon2" id="email" name="email" required="" />
                <button class="btn btn-primary" type="submit" id="button-addon2">Send
                    Invitation</button>
            </div>
        </form>;
    }



    return (
        <Fragment>
            <Offcanvas show={showCanvas} onHide={handleClose}>
                <Offcanvas.Header className='canvas-header' closeButton>
                    <h5 class="fs-24 text-black fw-5" id="offcanvasRightLabel">Invite An {canHeader}</h5>
                </Offcanvas.Header>
                <Offcanvas.Body className='canvas-body'>
                    <img src='/images/invitation.svg' />
                    <p class="text-black fw-4 fs-16 text-center">Lorem ipsum is a placeholder
                        text
                        commonly used to
                        demonstrate the visual form of a document or a typeface without relying
                        on
                        meaningful content. Lorem ipsum may be used as a placeholder before
                        final
                        copy
                        is available.</p>
                    {formOpen}

                </Offcanvas.Body>
            </Offcanvas>
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
