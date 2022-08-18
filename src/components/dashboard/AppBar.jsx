
import React, { Fragment, useContext, useEffect, useRef, useCallback } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { MainContext } from '../../route/AppRoute';

export const AppBar = () => {
  const { notifiModel, setNotifiModel, userName, role, user, modelShow, setmodelShow, showCanvas, setShowCanvas } = useContext(MainContext);
  const showModel = () => {
    setmodelShow(!modelShow);
  }
  const showNoti = () => {
    setNotifiModel(!notifiModel);
  }

  const handleShow = () => setShowCanvas(true);

  console.log(showCanvas, 'showCanvas');
  var show = '';
  if (modelShow === true) {
    show = {
      'display': 'block'
    }
  } else {
    show = {
      'display': 'none'
    }
  }
  var showNotif = '';
  if (notifiModel === true) {
    showNotif = {
      'display': 'block'
    }
  } else {
    showNotif = {
      'display': 'none'
    }
  }
  let modelRef = useRef();
  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      if (!modelRef.current.contains(event.target)) {
        setmodelShow(false);
        setNotifiModel(false);
      }


    })

  }, []);
  const logout = () => {

    localStorage.clear();
    <Navigate to={'/login'} />
  }

  let btnName;
  console.log(role, 'role');

  console.log('without callback');
  const memorizedCallBack = useCallback(
    () => {
      console.log('incallback');
      if (role === 'company') {
        btnName = "Invite Employee";
        return <button onClick={handleShow} className='btn btn-success btn-lg'>{btnName}</button>
      } else if (role === 'admin') {
        btnName = "Invite Orgnization";
        return <button onClick={handleShow} className='btn btn-success btn-lg'>{btnName}</button>
      } else if (role === 'employee') {
        btnName = "No need";

      }else{
        btnName = "hello";
      }
    }, [role]
  )




  return (
    <Fragment>
      <div className='appbar-content'>
        <div className='smmenu'>
          <img src='/images/menu.svg' />
        </div>
        <div className='appbar-content-heading'>
          Dashboard
          <button className='btn btn-success btn-lg appbar-content-heading-smbuton'>+</button>
        </div>
        <div className='appbar-content-actions'>
          {memorizedCallBack()}
          <i onClick={showNoti} class="fa fa-bell text-dark"></i>
          <img onClick={showModel} src={user.avatar != null ? 'http://localhost/project/hrm-dashboard/laravel-backend/example-app/public/upload/company_images/'+user.avatar : '/images/user.jpg' } width={'45px'} height='45px' />
        </div>
        <div ref={modelRef} className='appbar-content-bell' style={showNotif}>
          <h5 class="mt-0 mb-0 my-3 text-dark">
            Notifications
          </h5>
          <div className='appbar-content-bell-content'>

            <div className='appbar-content-bell-content-imag'><i class="fa fa-bell"></i></div>
            <div className='appbar-content-bell-content-text'>
              <a href='#'>
                No Notification Found.
              </a>
            </div>

          </div>
        </div>
        <div ref={modelRef} style={show} className='appbar-content-profile-card'>
          <img src='/images/profile-card-bg.png' width={'100%'} />
          <div className='appbar-content-profile-card-user-data'>
            <img src={user.avatar != null ? 'http://localhost/project/hrm-dashboard/laravel-backend/example-app/public/upload/company_images/'+user.avatar : '/images/user.jpg' }  width={'45px'} height='45px' />
            <h4> {user.name} </h4>
          </div>
          <ul className='appbar-content-profile-card-user-menu'>
            <li>
              <Link to='/profile' className='appbar-content-profile-card-user-menu-link'>
                <i class="fa-brands fa-creative-commons-remix"></i>
                <span>Profile</span>
              </Link>
            </li>
            <li>
              <a href="" className='appbar-content-profile-card-user-menu-link'>
                <i class="fa-brands fa-creative-commons-remix"></i>
                <span onClick={logout} >Logout</span>
              </a>
            </li>
          </ul>

        </div>
      </div>

    </Fragment>
  )
}
