import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

export default function CheckoutStep(props) {


    return (
        <Container className='step mt-5'>
            <Row>
                <Col><h3 className={props.step1 ? 'stepActive' : ""}>Sign In</h3></Col>
                <Col><h3 className={props.step2 ? 'stepActive' : ""}>Shipping Address</h3></Col>
                <Col><h3 className={props.step3 ? 'stepActive' : ""}>Payment</h3></Col>
                <Col><h3 className={props.step4 ? 'stepActive' : ""}>Place Order</h3></Col>
            </Row>
        </Container>
    )
}
