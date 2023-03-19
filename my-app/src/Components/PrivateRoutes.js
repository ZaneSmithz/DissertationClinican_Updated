import React from 'react'
import {useEffect} from "react"
import {  Navigate } from "react-router-dom";
import { UseAuth } from '../Contexts/AuthContext'
import { Outlet } from 'react-router'

const PrivateRoutes = ({children}) => {
    const { currentUser } = UseAuth();

    return (
        currentUser ? <Outlet/> : <Navigate to="/login"/>
      )
}

export default PrivateRoutes;

