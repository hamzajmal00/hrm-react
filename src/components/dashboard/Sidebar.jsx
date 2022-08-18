import React, { Fragment, useContext } from 'react'
import { MainContext } from '../../route/AppRoute';

export const Sidebar = () => {
    const { rotater, setRotater } = useContext(MainContext);
    const rotate = () => {
        setRotater(!rotater)
    }
    var style = {}
    var display = {}
    var gap = {}
    if (rotater === false) {
        style = {
            'transform': 'rotate(180deg)',

        }
        display = {
            'display': 'none'
        }
        gap = {
            'gap': '50px'
        }

    } else {
        style = {
            'transform': 'rotate(0deg)',

        }
    }


    return (
        <Fragment>
            <div className='sidebar-content'>
                <div className='sidebar-content-logo'>
                    <img src='/images/hrms-logo.svg' />
                    <span style={display} className='sidebar-content-logo-text'>
                        HRM
                    </span>
                    <div className='sidebar-content-logo-menu'>
                        <img onClick={rotate} style={style} src='/images/menu.svg' />
                    </div>
               
                </div>
                <ul className='sidebar-content-menu'>
                    <li className='sidebar-content-menu-list-active'>
                        <a href='#' className='sidebar-content-menu-list-link'>
                            <i className="fa fa-bars"></i>
                            <span style={display} className='sidebar-content-menu-list-link-text'>Dashboard</span>
                        </a>
                    </li>
                    <li className='sidebar-content-menu-list'>
                        <a href='#' className='sidebar-content-menu-list-link'>
                            <i class="fa-brands fa-creative-commons-remix"></i>
                            <span style={display} className='sidebar-content-menu-list-link-text'>Companies</span>
                        </a>
                    </li>
                    <li className='sidebar-content-menu-list'>
                        <a href='#' className='sidebar-content-menu-list-link'>
                            <i className="fa fa-users"></i>
                            <span style={display} className='sidebar-content-menu-list-link-text'>App Users</span>
                        </a>
                    </li>
                    <li className='sidebar-content-menu-list'>
                        <a href='#' className='sidebar-content-menu-list-link'>
                            <i className="fa fa-cogs"></i>
                            <span style={display} className='sidebar-content-menu-list-link-text'>Settings</span>
                        </a>
                    </li>

                </ul>
            </div>
        </Fragment>
    )
}
