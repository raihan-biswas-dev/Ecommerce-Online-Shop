import React, { useState, useEffect, useReducer, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios'
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';
import InnerImageZoom from 'react-inner-image-zoom';
import { Helmet } from "react-helmet-async";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Store } from "../Store";
import Slider from "react-slick";
import { useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Card, ListGroup, Badge, Button, Spinner, Alert, Form } from "react-bootstrap";
import Rating from "./Rating";





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



export default function ProductDetails() {

    // Slick Skider Start
    let settings = {
        dots: false,
        infinite: true,
        arrows: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        prevArrow: <FaArrowLeft className="prevArr" />,
        nextArrow: <FaArrowRight className="nextArr" />,

    };


    let navigate = useNavigate();
    let params = useParams();

    const [relatedProduct, setRelatedProduct] = useState([])
    const [couponText, setCouponText] = useState("")
    const [errCoupon, setErrCoupon] = useState("")
    const [discountPrice, setdDiscountPrice] = useState("")

    const [{ loading, err, product, productNotFoundErr }, dispatch] = useReducer(reducer, {
        loading: false,
        err: '',
        product: {},
        productNotFoundErr: 'Product Not found Try another Product'
    });



    useEffect(() => {
        let productloadingDetails = async () => {
            dispatch({ type: 'FETCH_REQUEST' })
            try {
                let product = await axios.get(`/products/${params.slug}`);
                dispatch({ type: 'FETCH_SUCCESS', payload: product.data })
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: err.message })
            }
        }
        productloadingDetails()

    }, [params.slug])


    useEffect(() => {
        let productloadingDetails = async () => {
            dispatch({ type: 'FETCH_REQUEST' })
            try {
                let product = await axios.get(`/products/${params.slug}`)
                dispatch({ type: 'FETCH_SUCCESS', payload: product.data })
                let relatedProduct = await axios.get("/products")
                let filterItem = relatedProduct.data.filter((item) => item.category == product.data.category && item.name !== product.data.name)
                setRelatedProduct(filterItem)
            } catch (err) {

            }
        }
        productloadingDetails()

    }, [params.slug])


    const { state, dispatch: ctxDispatch } = useContext(Store)
    const { cart } = state

    let handleAddToCart = async () => {
        const existingItem = cart.cartItems.find((item) => item._id === product._id);
        const quantity = existingItem ? existingItem.quantity + 1 : 1;

        const { data } = await axios.get(`/cartproduct/${product._id}`)
        if (data.stoke < quantity) {
            window.alert(`${product.name} out of stoke`)
            return
        }

        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...product, price: discountPrice ? discountPrice : product.price, quantity }
        })
        navigate(`/cartpage`);
    }


    let handleCouponText = (e) => {
        setCouponText(e.target.value)
    }

    let handleCoupon = () => {

        if (product.coupon !== "") {
            if (product.coupon == couponText) {
                let discountPrice = (product.price * product.discount) / 100
                let afterDiscountProduct = product.price - discountPrice
                if (afterDiscountProduct < product.discountLimit) {
                    setErrCoupon("For this price discount not applicable")
                } else {
                    setdDiscountPrice(afterDiscountProduct)
                }
            } else {
                setErrCoupon("Wrong coupon code")
            }
        } else {
            setErrCoupon("Coupon not available")
        }

    }

    return (
        <div>

            <Container>
                <Helmet>
                    <title>{product.name}</title>
                </Helmet>
                {loading ?

                    <div className="loading">
                        <Spinner animation="grow" variant="success" />
                    </div>
                    :

                    <div className="product-main mt-5">
                        {product ?
                            <Row>
                                <Col lg={5}>
                                    <InnerImageZoom src={product.img} zoomScale={2} zoomSrc={product.img} alt={product.name} />
                                </Col>
                                <Col lg={4}>{
                                    <Card>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item>
                                                <h3>{product.name}</h3>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                {
                                                    product.stoke > 0 ? <div>
                                                        Stoke <Badge bg="success">{product.stoke}</Badge>
                                                    </div>
                                                        :
                                                        <div>
                                                            Stoke <Badge bg="danger">{product.stoke}</Badge>
                                                        </div>

                                                }

                                                <h4>${product.price}</h4>
                                            </ListGroup.Item>

                                            <ListGroup.Item>
                                                <Rating rating={product.rating} numberOfRating={product.numberOfRating} />
                                            </ListGroup.Item>
                                            <ListGroup.Item className="ProductMainDes">{product.description}</ListGroup.Item>
                                        </ListGroup>
                                    </Card>
                                }</Col>
                                <Col lg={3}>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item><h3>Price</h3></ListGroup.Item>
                                        <ListGroup.Item>
                                            <h4>${discountPrice ? <del>{product.price}</del> : product.price}</h4>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            {discountPrice ? <h5>After discount : ${discountPrice}</h5> : ""}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Form.Control onChange={handleCouponText} type="text" placeholder="Coupon code" />
                                            <Form.Text id="passwordHelpBlock" muted>
                                                {errCoupon}
                                            </Form.Text>
                                            <br />
                                            <Button onClick={handleCoupon} className="me-3" variant="dark">Apply</Button>
                                            <Button onClick={handleAddToCart} variant="dark">Add To Cart</Button>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                            </Row>
                            :
                            <Alert className="text-center" variant='danger'>
                                {productNotFoundErr}
                            </Alert>
                        }
                        <Row className="mt-5">
                            <h3>Related Products</h3>
                            {relatedProduct.length > 0 ?


                                <Slider {...settings}>

                                    {
                                        relatedProduct.map(item => (

                                            <Card className="" style={{ width: '18rem' }}>
                                                <Link to={`/products/${item.slug}`}>
                                                    <Card.Img style={{ height: '250px' }} variant="top" src={item.img} />
                                                </Link>
                                                <Card.Body>
                                                    <Card.Title>${item.price}</Card.Title>
                                                    <Card.Title>
                                                        <Link to={`/products/${item.slug}`}>{item.name}</Link>
                                                    </Card.Title>
                                                    <Button variant="primary">Add To Cart</Button>
                                                </Card.Body>
                                            </Card>
                                        ))
                                    }
                                </Slider>

                                :

                                <Alert variant="danger">
                                    No Related Product Found
                                </Alert>

                            }
                        </Row>
                    </div>

                }
            </Container>
        </div>
    )
}
