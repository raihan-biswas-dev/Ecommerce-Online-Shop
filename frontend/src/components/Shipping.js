import React, { useState, useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import { Form, Button, Container, Alert } from 'react-bootstrap'
import { Store } from '../Store'
import { useNavigate } from 'react-router-dom'
import CheckoutStep from './CheckoutStep'

export default function Shipping() {


    const navigate = useNavigate()
    const { state4, dispatch4 } = useContext(Store)



    const [fullname, setFullname] = useState(state4.shippingAddress.fullname || "")
    const [address, setAddress] = useState(state4.shippingAddress.address || "")
    const [city, setCity] = useState(state4.shippingAddress.city || "")
    const [postalcode, setPostalcode] = useState(state4.shippingAddress.postalcode || "")
    const [country, setCountry] = useState(state4.shippingAddress.country || "")

    console.log(state4.shippingAddress)

    let handlShippingSubmit = (e) => {
        e.preventDefault();
        dispatch4({
            type: 'SHIPPING_ADDRESS',
            payload: {
                fullname,
                address,
                city,
                postalcode,
                country
            }

        })

        localStorage.setItem('shippingAddress', JSON.stringify(
            {
                fullname,
                address,
                city,
                postalcode,
                country
            }
        ))

        navigate('/payment')

    }


    return (
        <>
            <Helmet>
                <title>Shipping Address</title>
            </Helmet>

            <CheckoutStep step1='true' step2='true' />


            <div className="shipping_main">
                <Container className='w-25 mt-5 border p-4'>

                    <Alert variant="secondary" className='text-center'>
                        <h2>Shipping Address</h2>
                    </Alert>
                    <Form onSubmit={handlShippingSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control value={fullname} onChange={(e) => setFullname(e.target.value)} type="text" placeholder="Write your full name" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control value={address} onChange={(e) => setAddress(e.target.value)} type="text" placeholder="Address" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>City</Form.Label>
                            <Form.Control value={city} onChange={(e) => setCity(e.target.value)} type="text" placeholder="City" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Postal Code</Form.Label>
                            <Form.Control value={postalcode} onChange={(e) => setPostalcode(e.target.value)} type="text" placeholder="Post code" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Country</Form.Label>
                            <Form.Control value={country} onChange={(e) => setCountry(e.target.value)} type="text" placeholder="Country" />
                        </Form.Group>
                        <Button type='submit' variant="primary">Primary</Button>
                    </Form>
                </Container>
            </div>
        </>
    )
}
