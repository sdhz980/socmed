'use client'
import React from 'react'
import Login from './components/Login'
import { useSelector } from 'react-redux'
import { RootState } from "@/lib/store";
import Register from './components/Register';
import Loading from '../components/Loading';

const loginPage = () => {
    const loginSwitch = useSelector((state:RootState) => state.userReducer.loginSwitch)
    const isLoading = useSelector((state:RootState) => state.userReducer.loading)

  return (
    <div className='bg-black'>

        {
        isLoading ? ( <Loading/> ) : ( loginSwitch ? <Login/> : <Register/> )
        }

    </div>
  )
}

export default loginPage