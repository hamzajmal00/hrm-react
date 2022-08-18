import React, { createContext, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Canvas } from '../components/Canvas';
import { Dashboard } from '../pages/Dashboard';
import { Forget } from '../pages/Forget';
import { Login } from '../pages/Login';
import { Profile } from '../pages/Profile';
import { Reset } from '../pages/Reset';
import Register from '../pages/Register';
import axios from 'axios';
import { CompanyRegister } from '../pages/CompanyRegister';
import { EmployeeRegister } from '../pages/EmployeeRegister';
export const MainContext = createContext();

export const AppRoute = () => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [role, setRole] = useState('');
    const [user, setUser] = useState('');
    const [notifiModel, setNotifiModel] = useState(false);

    useEffect(() => {
        axios.get('/user')
            .then(function (response) {
                // handle success
                setUserName(response.data.user.name);
                setUserEmail(response.data.user.email);
                setUser(response.data.user);
                setRole(response.data.role);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })

    }, []);

    
    const [modelShow, setmodelShow] = useState(false);
    const [rotater, setRotater] = useState(true);
    const [showCanvas, setShowCanvas] = useState(false);


    const value = {
        modelShow,
        setmodelShow,
        rotater,
        setRotater,
        showCanvas,
        setShowCanvas,
        userName,
        setUserName,
        userEmail,
        setUserEmail,
        role,
        setRole,
        notifiModel, setNotifiModel,
        user, setUser,

    }
    
    return (
        <BrowserRouter>
            <MainContext.Provider value={value} >
                <Canvas />
                <Routes>
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/register" element={<Register />} />
                    <Route exact path="/registercompany" element={<CompanyRegister />} />
                    <Route exact path="/registeremployee" element={<EmployeeRegister />} />
                    <Route exact path="/forget" element={<Forget />} />
                    <Route exact path="/reset" element={<Reset />} />
                    <Route exact path="/profile" element={<Profile />} />
                    <Route exact path="/" element={<Dashboard />} />
                </Routes>

            </MainContext.Provider>
        </BrowserRouter>
    )
}
