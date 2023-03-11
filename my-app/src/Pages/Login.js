import React, { useRef, useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { UseAuth } from '../Contexts/AuthContext'
import { useNavigate } from "react-router-dom"

const Login = () => {
    const emailRef= useRef()
    const passwordRef = useRef()
    const { login } = UseAuth()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setError("");
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value);
            navigate('/dashboard', { replace: true });
            
        }
        catch {
            setError("Failed to sign in");
        }
        setLoading(false);
    }

    return (
        <div className='containerColourNoNav'>
            <Form onSubmit={handleSubmit}>
                <h> Login</h>
                {error && <Alert variant="danger"> {error} </Alert>}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control required type="email"  ref={emailRef} placeholder="Enter email" />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required type="password" ref={passwordRef} placeholder="Password" />
                </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
            </Form>
        </div>


    )
}

export default Login;