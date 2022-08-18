import React, { createContext, Fragment, useContext, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { AppBar } from '../components/dashboard/AppBar'
import { ContentContainer } from '../components/dashboard/ContentContainer'
import { Sidebar } from '../components/dashboard/Sidebar'
import { ProfileContent } from '../components/profile/ProfileContent'
import { MainContext } from '../route/AppRoute'



export const Profile = () => {

    const { rotater } = useContext(MainContext);

    var margin = {}
    var width = {}
    if (rotater === false) {

        margin = {
            'margin-left': '90px'
        }
        width = {
            'width': '90px',

        }
    } else {
        margin = {
            'margin-left': '250px'
        }
    }
    if(!localStorage.getItem('token')){
        return <Navigate to={'/login'} />
    }
    return (
        <Fragment>
            <div className='wrape-content'>

                <div style={width} className='wrape-content-sidebar'>
                    <Sidebar />
                </div>
                <div style={margin} className='wrape-content-main'>
                    <AppBar />
                    <ProfileContent />
                </div>

            </div>
        </Fragment>
    )
}
