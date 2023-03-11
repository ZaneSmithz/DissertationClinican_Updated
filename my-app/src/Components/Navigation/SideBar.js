import React, {useState} from 'react'
import {Nav, Image} from 'react-bootstrap';
import '../CSS/Dashboard.css';
import { UseAuth } from '../../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const SideBar = (props) => {
    const { currentUser, logout } = UseAuth();
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogout = async() => {
        setError('');
  
        try {
          await logout();
          navigate('/login')
  
        } catch {
          setError('Logout failed');
        }
      }

    return (
        <Nav className=" d-inline justify-content-center sidebar" style={{width: "304px"}} activeKey="/home">
                <Image className="avatarBig liAvatar d-flex justify-content-center" src="https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" roundedCircle/>
                <Nav.Item className= "d-flex justify-content-center liNavLink">
                    <Nav.Link href="/dashboard">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item className=" d-flex justify-content-center  liNavLink">
                    <Nav.Link href="/chat">Chat</Nav.Link>
                </Nav.Item>
                <Nav.Item className="d-flex justify-content-center liNavLink">
                    <Nav.Link href="/manager">Client</Nav.Link>
                </Nav.Item>
                <Nav.Item className="d-flex justify-content-center liNavLink">
                    <Nav.Link onClick={handleLogout}>Log out</Nav.Link>
                </Nav.Item>
        </Nav>
    )
}

export default SideBar;

