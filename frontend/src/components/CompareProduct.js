import React, { useEffect, useReducer, useState } from 'react'
import axios from 'axios';
import { Container, Row, Col, Dropdown, Card, Button } from 'react-bootstrap'



function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, product: action.payload };
        case 'FETCH_FAIL':
            return { ...state, err: false, err: action.payload };
        default:
            return state
    }
}



export default function CompareProduct() {

    const [singleCompareProduct, setSingleCompareProduct] = useState("")
    const [singleCompareProduct2, setSingleCompareProduct2] = useState("")
    const [{ loading, err, product }, dispatch] = useReducer(reducer, {
        loading: false,
        err: '',
        product: [],
    });


    useEffect(() => {
        let productloadingDetails = async () => {
            dispatch({ type: 'FETCH_REQUEST' })
            try {
                let product = await axios.get("/products");
                dispatch({ type: 'FETCH_SUCCESS', payload: product.data })
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: err.message })
            }
        }
        productloadingDetails()

    }, [])


    let handleCampare = async (params) => {
        let product = await axios.get(`/products/${params}`);
        setSingleCompareProduct(product.data)
    }
    let handleCampare2 = async (params) => {
        let product = await axios.get(`/products/${params}`);
        setSingleCompareProduct2(product.data)
    }

    return (
        <>
            <Container>
                <Row className='mt-5'>
                    <Col lg={6}>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Choose Product
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {product.map(item => (
                                    <>
                                        <Dropdown.Item onClick={() => handleCampare(item.slug)}>
                                            <img className='compareImg' src={item.img} alt="" />
                                            {item.name}</Dropdown.Item>
                                    </>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Card className='mt-5'>
                            {singleCompareProduct ?
                                <>
                                    <Card.Img variant="top" src={singleCompareProduct.img} />
                                    <Card.Body>
                                        <Card.Title>{singleCompareProduct.name}</Card.Title>
                                        <Card.Title>${singleCompareProduct.price}</Card.Title>
                                        <Card.Text>
                                            {singleCompareProduct.description}
                                        </Card.Text>
                                        <Button variant="primary">Add To Cart</Button>
                                    </Card.Body>
                                </>
                                :
                                <h3>Choose A Product</h3>
                            }
                        </Card>
                    </Col>
                    <Col lg={6}>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Choose Product
                            </Dropdown.Toggle>

                            <Dropdown.Menu >
                                {product.map(item => (
                                    <>
                                        <Dropdown.Item onClick={() => handleCampare2(item.slug)}>
                                            <img className='compareImg' src={item.img} alt="" />
                                            {item.name}</Dropdown.Item>
                                    </>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Card className='mt-5'>
                            {singleCompareProduct2 ?
                                <>
                                    <Card.Img variant="top"  src={singleCompareProduct2.img} />
                                    <Card.Body>
                                        <Card.Title>{singleCompareProduct2.name}</Card.Title>
                                        <Card.Title>${singleCompareProduct2.price}</Card.Title>
                                        <Card.Text>
                                            {singleCompareProduct2.description}
                                        </Card.Text>
                                        <Button variant="primary">Add To Cart</Button>
                                    </Card.Body>
                                </>
                                :
                                <h3>Choose A Product</h3>
                            }
                        </Card>
                    </Col>

                </Row>
            </Container>
        </>
    )
}
