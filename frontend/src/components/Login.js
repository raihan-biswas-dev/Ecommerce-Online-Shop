import React, { useContext, useEffect, useState } from 'react'
import { Container, Form, Button, Alert } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { Store } from '../Store'
import { toast } from 'react-toastify';

export default function Login() {

    const navigate = useNavigate()
    let { search } = useLocation()
    let redirectUrl = new URLSearchParams(search).get("redirect")
    let redirect = redirectUrl ? redirectUrl : "/"
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")

    const { state3, dispatch3 } = useContext(Store)


    const { userInfo } = state3



    let handleloginSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post("/api/users/signin", {
                email,
                password
            })
            console.log(data)

            dispatch3({ type: 'USER_SIGNIN', payload: data })
            localStorage.setItem('userInfo', JSON.stringify(data))
            navigate(redirect || '/')
        } catch (err) {
            toast.error("Invalid email or pass")
        }
    }

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    })

    return (
        <Container className='w-25 mt-5 border p-3'>
            <Alert variant="secondary" className='text-center'>
                <h2>Login</h2>
            </Alert>


            <Form onSubmit={handleloginSubmit}>
                <Form.Label htmlFor="inputPassword5">Email</Form.Label>
                <Form.Control
                    type="email"
                    placeholder='write your email'
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Form.Label htmlFor="inputPassword5">Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder='write your password'
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button type='submit' className='mt-3 mb-2' variant="primary">SignIn</Button>
            </Form>
            <br />
            <Form.Text id="passwordHelpBlock" muted>
                Don't have an account? <Link to={`/signup?redirect=${redirect}`}>Create Account</Link>
            </Form.Text>
        </Container>
    )
}
