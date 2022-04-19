import React from 'react'
import { Container, Form, Button, Alert } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'

export default function Login() {


    let { search } = useLocation()
    let redirectUrl = new URLSearchParams(search).get("redirect")
    let redirect = redirectUrl ? redirectUrl : "/"

    return (
        <Container className='w-25 mt-5 border p-3'>
            <Alert variant="secondary" className='text-center'>
                Login
            </Alert>


            <Form.Label htmlFor="inputPassword5">Email</Form.Label>
            <Form.Control
                type="email"
                placeholder='write your email'
            />

            <Form.Label htmlFor="inputPassword5">Password</Form.Label>
            <Form.Control
                type="password"
                placeholder='write your password'
            />

            <Button className='mt-3 mb-2' variant="primary">Primary</Button>
            <br />
            <Form.Text id="passwordHelpBlock" muted>
                Don't have an account? <Link to={`/signup?redirect=${redirect}`}>Create Account</Link>
            </Form.Text>
        </Container>
    )
}
