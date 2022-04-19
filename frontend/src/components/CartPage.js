import React, { useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import { Container, Row, Col, Alert, ListGroup, Button, Card } from 'react-bootstrap'
import { Store } from '../Store';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';


export default function CartPage() {
    let navigate = useNavigate();
    const { state, dispatch } = useContext(Store)
    const { cart: { cartItems } } = state

    let updateCart = (item, quantity) => {
        dispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...item, quantity }
        })
    }



    let handleRemoveItem = (item) => {
        dispatch({
            type: 'CART_REMOVE_ITEM',
            payload: item
        })
    }

    let handleCheckOut = () => {
        navigate("/signin?redirect=/shipping")
    }

    return (
        <Container>
            <Helmet>
                <title>Shopping Cart</title>
            </Helmet>
            <Row className='mt-5 text-center'>
                <Col lg={8}>
                    {cartItems.length < 0 ?

                        <Alert variant='danger'>
                            Cart Is Empty
                        </Alert>
                        :
                        <ListGroup>

                            {cartItems.map((item) => (
                                <ListGroup.Item>
                                    <Row>
                                        <Col lg={4}>
                                            <img width='50' src={item.img} alt="" />
                                            <Link to={`/products/${item.slug}`} >{item.name}</Link>
                                        </Col>
                                        <Col lg={3}>
                                            <Button onClick={() => updateCart(item, item.quantity - 1)} disabled={item.quantity === 1} variant="success">-</Button>
                                            <span>{item.quantity}</span>
                                            <Button onClick={() => updateCart(item, item.quantity + 1)} disabled={item.quantity === item.stoke} variant="success">+</Button>
                                        </Col>
                                        <Col lg={3}>
                                            <Button className='deleteBtn' onClick={() => handleRemoveItem(item)} variant="dark"><FaTrash /> Delete</Button>
                                        </Col>

                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>

                    }
                </Col>
                <Col lg={4}>
                    {/* {cartItems.length > 0 ?

                        <>
                            <h2>Total ({cartItems.reduce((accumulator, current) => accumulator + current.quantity, 0)}) Products</h2>
                            <h3>Price : ${cartItems.reduce((accumulator, current) => accumulator + current.price * current.quantity, 0)} </h3>
                            <Button onClick={handleCheckOut} className='checkoutBtn w-100'>Checkout</Button>
                        </>
                        :
                        ""

                    } */}

                    <Card border="">
                        <Card.Body>
                            {cartItems.length > 0 ?

                                <>
                                    <Card.Header>
                                    <h2>Total ({cartItems.reduce((accumulator, current) => accumulator + current.quantity, 0)}) Products</h2>

                                    </Card.Header>
                                    <h3>Price : ${cartItems.reduce((accumulator, current) => accumulator + current.price * current.quantity, 0)} </h3>
                                    <Button onClick={handleCheckOut} className='checkoutBtn mt-4 w-100'>Checkout</Button>
                                </>
                                :
                                ""

                            }
                        </Card.Body>
                    </Card>







                </Col>
            </Row>
        </Container>
    )
}
