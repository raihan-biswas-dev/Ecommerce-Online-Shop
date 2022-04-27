import React, { useState, useEffect, useReducer, useContext } from "react";
import { Container, Row, Col, Card, Button, Spinner, Modal, Badge, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from 'axios'
import { Store } from "../Store";
import InnerImageZoom from "react-inner-image-zoom";
import { FaHeart } from 'react-icons/fa';
import { useNavigate, } from "react-router-dom";
import Rating from "./Rating";
import { Helmet } from "react-helmet-async";



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






export default function Products() {

    const [lgShow, setLgShow] = useState(false);
    const [productDetails, setProductDetails] = useState({})
    const [searchKeyWord, setSearchKeyWord] = useState("")
    const [searchMetch, setSearchMetch] = useState("")
    const [searchProduct, setSearchProduct] = useState([])

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


    let handleDetails = async (pro) => {
        setLgShow(true)
        let productDetails = await axios.get(`/products/${pro}`);
        setProductDetails(productDetails.data)
    }



    const { state, dispatch: ctxDispatch, state2, dispatch2 } = useContext(Store)
    const { cart, wishlist } = state

    let handleAddToCart = async (product) => {
        const existingItem = cart.cartItems.find((item) => item._id === product._id);
        const quantity = existingItem ? existingItem.quantity + 1 : 1;

        const { data } = await axios.get(`/cartproduct/${product._id}`)
        if (data.stoke < quantity) {
            window.alert(`${product.name} out of stoke`)
            return
        }

        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...product, quantity }
        })
    }


    // =====================Wish List Part====================

    let handleAddToWishList = async (product) => {
        dispatch2({
            type: 'WISHLIST_ADD_ITEM',
            payload: { ...product }
        })
    }


    // Search function===================
    // let handleSearch = (e) => {
    //     setSearchKeyWord(e.target.value)
    //     let a = product.filter(item => item.name.includes(e.target.value))
    //     setSearchProduct(a)
    //     console.log(a)
    // }
    // Search function===================



    // =====================Wish List Part====================

    return (
        <div>
            <Container>
                <Helmet>
                    <title>Product</title>
                </Helmet>
                <Row>
                    <Form.Control onChange={(e) => setSearchMetch(e.target.value)} type="text" placeholder="find your product" />
                    {loading ?
                        <div className="loading">
                            <Spinner animation="grow" variant="success" />
                        </div>
                        :

                        product.filter((item) => {
                            if (searchMetch == "") {
                                return item
                            } else if (item.name.toLowerCase().includes(searchMetch.toLocaleLowerCase())) {
                                return item
                            }
                        })
                            .map(item => (
                                <Col lg={3}>
                                    <Card className="mt-5 text-center">

                                        <div style={{ cursor: "pointer" }} onClick={() => handleDetails(item.slug)}>
                                            <Card.Img variant="top" src={item.img} />
                                        </div>


                                        <Card.Body>
                                            <Card.Title className="productHeading">
                                                <Link to={`/products/${item.slug}`}>{item.name}

                                                    {item.totalSell > 50 ? <Badge bg="success"> Best seller</Badge> : ""}

                                                </Link>
                                            </Card.Title>
                                            <Rating rating={item.rating} numberOfRating={item.numberOfRating} />
                                            <Card.Title className="productPrice">${item.price}</Card.Title>
                                        </Card.Body>
                                        <Card.Body>
                                            {item.stoke == 0 ?

                                                <>
                                                    <Button size="sm" className="me-2" onClick={() => handleAddToCart(item)} variant="dark outOfStokeBtn productBtn">Out Of Stoke</Button>
                                                    <Button size="sm" className="" onClick={() => handleDetails(item.slug)} variant="primary productBtn" >Details</Button>
                                                    <Button size="sm" onClick={() => handleAddToWishList(item)} className="ms-2" variant="primary productBtn" ><FaHeart /></Button>

                                                </>
                                                :
                                                <>
                                                    <Button size="sm" className="me-2" onClick={() => handleAddToCart(item)} variant="primary productBtn">Add To Cart</Button>
                                                    <Button size="sm" className="" onClick={() => handleDetails(item.slug)} variant="primary productBtn" >Details</Button>
                                                    <Button size="sm" className="ms-2" onClick={() => handleAddToWishList(item)} variant="primary productBtn" ><FaHeart /></Button>

                                                </>
                                            }
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                    }
                </Row>

                {/* product modal */}
                <Modal className=""
                    size="lg"
                    show={lgShow}
                    onHide={() => setLgShow(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            Product Details
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="productModalMain">
                        {
                            productDetails ?
                                <Card className="">
                                    <Row>
                                        <Col lg={6}>
                                            <InnerImageZoom src={productDetails.img} zoomScale={2} zoomSrc={productDetails.img} alt={productDetails.name} />

                                        </Col>
                                        <Col lg={6}>
                                            <Card.Body className="text-center">
                                                <Card.Title>
                                                    <h3>{productDetails.name}</h3>
                                                </Card.Title>
                                                <Card.Title>
                                                    <h4>${productDetails.price}</h4>
                                                </Card.Title>
                                                <Card.Text className="productModalDes">
                                                    {productDetails.description}
                                                </Card.Text>
                                                <Button onClick={() => handleAddToCart(productDetails)} className="modalAddToCartBtn" >Add to cart</Button>
                                            </Card.Body>
                                        </Col>
                                    </Row>
                                </Card>
                                :
                                <h3>Details Not Found</h3>
                        }
                    </Modal.Body>
                </Modal>

            </Container>
        </div>
    )
}









