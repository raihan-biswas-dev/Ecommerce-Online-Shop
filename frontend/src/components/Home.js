import React, { useEffect, useState } from 'react'
import { Helmet } from "react-helmet-async";
import { Container, Row, Col, Modal, Button, ListGroup, Card } from "react-bootstrap";
import axios from 'axios';


export default function Home() {

  const [show, setShow] = useState(false);
  const [discountImg, setDiscountImg] = useState(false);
  const [category, setCategory] = useState([]);
  const [categoryProduct, setCategoryProduct] = useState([]);



  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  
  useEffect(() => {
    let discountDetails = async () => {
      let { data } = await axios.get("/discount");
      setDiscountImg(data.img)
      // handleShow(true) ===============this is modal discount inages popup ======================
      
      let categoryArr = []

      let product = await axios.get("/products");
      
      product.data.map((item) => {
        console.log(item)
        if (categoryArr.indexOf(item.category) == -1) {
          categoryArr.push(item.category)
        }
      })
      setCategory(categoryArr)
    }
    discountDetails()
  }, [])


  let handleCategory = async (category) => {
    let categoryProduct = await axios.get(`/category/${category}`);
    setCategoryProduct(categoryProduct.data)
  }

  return (
    <>
      <>
        <Helmet>
          <title>E-Shop</title>
        </Helmet>
        
        <div className='banner'>
          <img style={{ height: '500px', width: '100%' }} src="images/banner.jpg" alt="" />
          <div className="category">
            <ListGroup>
              {category.map(item => (
                <ListGroup.Item onClick={() => handleCategory(item)}>{item}</ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </div>


        {/* category Product  */}

        <Container>
          <Row>
            {categoryProduct ?
              categoryProduct.map((item) => (
                <Col lg={3}>
                  <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={item.img} />
                    <Card.Body>
                      <Card.Title>{item.price}</Card.Title>
                      <Card.Title>{item.name}</Card.Title>
                      <Button variant="primary">Add To Cart</Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
              :

              <h3>Product not Found</h3>

            }
          </Row>
        </Container>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Get your Offer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src={discountImg} alt="" />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Get Off
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </>
  )
}
