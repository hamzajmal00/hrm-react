import React, { useEffect, Fragment, useContext, useState } from 'react'
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import { MainContext } from '../../route/AppRoute';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ProfileContent = () => {
    const { user, setUser } = useContext(MainContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [image, setImage] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
  


    useEffect(() => {
        setEmail(user.email)
        setName(user.name)
        setPhone(user.phone)
        setAddress(user.address)
        setImage(user.avatar)
    }, [user])

    console.log(image, "image path");

    const submitForm = (e) => {

        e.preventDefault();
        const formData = new FormData();

        formData.append('id', user.id);
        formData.append('image', image);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('address', address);
        console.log(address, "edit data");

        axios.post('/edtitprofile', formData)
            .then(function (response) {
                
                setUser(response.data.user);
                toast.success(response.data.message)

            })
            .catch(function (error) {
                setErrorMessage(error.response.data.message);
            });
    }
    const changePass = (e) => {

        e.preventDefault();
        // const passData = new FormData();

        // passData.append('old_password', oldPassword);
        // passData.append('new_password', password);
        // formData.append('c_password', cpassword);

        const data = {
            old_password: oldPassword,
            new_password: password,
            c_password: cpassword
        }


        axios.post('/change_password', data)
            .then(function (response) {
                setMessage(response.data.message);
                toast.success(response.data.message)

            })
            .catch(function (error) {
                setErrorMessage(error.response.data.message);
            });
    }

  


    return (
        <Fragment>
            <div className='profil-content-container'>
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">

                    <div className='row'>
                        <div className='col-lg-4'>
                            <div className='profil-content-container-tabsmenu'>
                                <Nav variant="pills" className="flex-column">
                                    <Nav.Item>
                                        <Nav.Link className='profil-content-container-tabsmenu-link' eventKey="first"><i class="fa fa-cog" aria-hidden="true"></i><span class="ms-3">General
                                            Settings</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link className='profil-content-container-tabsmenu-link' eventKey="second">

                                            <i class="fa fa-lock" aria-hidden="true"></i>
                                            <span class="ms-3">Change
                                                Password
                                            </span>
                                        </Nav.Link>
                                    </Nav.Item>

                                </Nav>
                                <div className='profil-content-container-tabsmenu-profile-card'>
                                    <img src='/images/card-img.png' />
                                    <div className='profil-content-container-tabsmenu-profile-card-data'>
                                        <img src={user.avatar != null ? 'http://localhost/project/hrm-dashboard/laravel-backend/example-app/public/upload/company_images/' + user.avatar : '/images/user.jpg'} width={'45px'} height='45px' />
                                        <h3>
                                            Super Admin
                                        </h3>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className='col-lg-8'>

                            <Tab.Content className='profil-content-container-tabscontetn'>
                                <Tab.Pane eventKey="first">
                                    <h2 class="fs-18 fw-5 text-black">General Settings</h2>
                                    <div class="profil-content-container-tabscontetn-form-div">
                                        <form onSubmit={submitForm}>
                                          
                                            <input type='hidden' value={user.id} />
                                            <div class="row mb-3">
                                                <label for="name" class="col-sm-3 col-form-label signup-label">Name</label>
                                                <div class="col-sm-9">
                                                    <input type="text" class="form-control sign-up-control" onChange={(e) => setName(e.target.value)} value={name} name="name" id="name" required="" />
                                                    <div class="invalid-feedback">
                                                        Please choose a username.
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <label for="email" class="col-sm-3 col-form-label signup-label">Email</label>
                                                <div class="col-sm-9">
                                                    <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} class="form-control sign-up-control" id="email" required="" name="email" />
                                                    <div class="invalid-feedback">
                                                        Please choose an email.
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <label for="phone" class="col-sm-3 col-form-label signup-label">
                                                    Phone Number</label>
                                                <div class="col-sm-9">
                                                    <input type="number" onChange={(e) => setPhone(e.target.value)} value={phone} class="form-control sign-up-control" id="phone" required="" name="phone_no" />
                                                    <div class="invalid-feedback">
                                                        Please choose a valid phone number.
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <label for="address" class="col-sm-3 col-form-label signup-label">
                                                    Address</label>
                                                <div class="col-sm-9">
                                                    <input type="text" onChange={(e) => setAddress(e.target.value)} value={address} class="form-control sign-up-control" id="address" required="" name="address" />
                                                    <div class="invalid-feedback">
                                                        Please choose a valid address.
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <label for="logo" class="col-sm-3 col-form-label signup-label">
                                                    Upload Image</label>
                                                <div class="col-sm-9">


                                                    <input type="file" onChange={(e) => setImage(e.target.files[0])} class="form-control sign-up-control" id="logo" accept="image/*" name="profile" />
                                                    <div class="invalid-feedback">
                                                        Please choose a company logo.
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="text-end">
                                                <button type="submit" class="btn btn-lg btn-success ms-2">Save
                                                    changes</button>
                                            </div>
                                        </form>
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <h2 class="fs-18 fw-5 text-black">
                                        Change Password
                                    </h2>
                                    <div class="profil-content-container-tabscontetn-form-div">
                                        <form onSubmit={changePass}>
                                           
                                            <div class="row mb-3 passwd">
                                                <label for="last_password" class="col-sm-4 col-form-label signup-label">Enter
                                                    last password</label>
                                                <div class="col-sm-8">
                                                    <input type="password" onChange={(e) => setOldPassword(e.target.value)} name="current_password" class="form-control sign-up-control" placeholder="Enter your old password" />
                                                    <span class="pwd-viewer">
                                                        <i class="bi bi-eye-slash" id="togglePassword" aria-hidden="true"></i>
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="row mb-3 passwd">
                                                <label for="last_password" class="col-sm-4 col-form-label signup-label">
                                                    New Password
                                                </label>
                                                <div class="col-sm-8">
                                                    <input type="password" onChange={(e) => setPassword(e.target.value)} name="new_password" class="form-control sign-up-control" placeholder="Enter your old password" />
                                                    <span class="pwd-viewer">
                                                        <i class="bi bi-eye-slash" id="togglePassword" aria-hidden="true"></i>
                                                    </span>
                                                </div>
                                            </div>


                                            <div class="row mb-3 passwd">
                                                <label for="last_password" class="col-sm-4 col-form-label signup-label">
                                                    Confirm Password
                                                </label>
                                                <div class="col-sm-8">
                                                    <input type="password" onChange={(e) => setCPassword(e.target.value)} name="c_password" class="form-control sign-up-control" placeholder="Enter your old password" />
                                                    <span class="pwd-viewer">
                                                        <i class="bi bi-eye-slash" id="togglePassword" aria-hidden="true"></i>
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="text-end mt-3">

                                                <button type="submit" class="btn btn-lg btn-success ms-2">Save
                                                    changes</button>
                                            </div>
                                        </form>
                                    </div>
                                </Tab.Pane>
                            </Tab.Content>

                        </div>
                    </div>
                </Tab.Container>
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
