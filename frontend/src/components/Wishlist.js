import React, { useContext, useReducer } from 'react'
import { Helmet } from 'react-helmet-async'
import { Container, Row, Col, Alert, ListGroup, Button } from 'react-bootstrap'
import { Store } from '../Store';
import { FaShoppingCart } from 'react-icons/fa';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';


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




export default function Wishlist() {
    const { state, dispatch: ctxDispatch } = useContext(Store)
    const { cart } = state

    const [{ product }, dispatch] = useReducer(reducer, {
        product: [],
    });


    let navigate = useNavigate();
    const { state2, dispatch2 } = useContext(Store)
    const { wishlist: { wishlistItems } } = state2

    let updateCart = (item, quantity) => {
        dispatch2({
            type: 'WISHLIST_ADD_ITEM',
            payload: { ...item }
        })
    }

    // =================  line Num 25 somethig is wrong maybe===========













    let handleAddToCart = async (product) => {

        console.log(product)
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

        handleRemoveItem(product);
        // console.log(handleRemoveItem())


        navigate(`/cartpage`);
    }



    // =================  line Num 25 somethig is wrong maybe===========












    let handleRemoveItem = (item) => {
        dispatch2({
            type: 'WISHLIST_REMOVE_ITEM',
            payload: item
        })
    }

    return (
        <Container>
            <Helmet>
                <title>Wish List</title>
            </Helmet>
            <Row className='mt-5 text-center'>
                <Col lg={8}>
                    {wishlistItems.length < 0 ?

                        <Alert variant='danger'>
                            Wish List Is Empty
                        </Alert>
                        :
                        <ListGroup>

                            {wishlistItems.map((item) => (
                                <ListGroup.Item>
                                    <Row>
                                        <Col lg={3}>
                                            <img width='50' src={item.img} alt="" />
                                            <Link to={`/products/${item.slug}`} >{item.name}</Link>
                                        </Col>
                                        <Col lg={3}>
                                            <h5>Price : ${item.price}</h5>
                                        </Col>
                                        <Col lg={3}>
                                            <Button className='deleteBtn'  onClick={() => handleAddToCart(item)} variant="dark"> <FaShoppingCart/> Add To Cart </Button>
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
            </Row>
        </Container>
    )
}
