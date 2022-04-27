import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Navbar, Container, Nav, Badge, NavDropdown, Alert, ListGroup, Button, Card, Offcanvas } from "react-bootstrap";
import Home from "./components/Home";
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import CartPage from "./components/CartPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useContext } from "react";
import { FaTrash, FaShoppingCart } from 'react-icons/fa';
import { Store } from "./Store";
import Wishlist from "./components/Wishlist";
import CompareProduct from "./components/CompareProduct";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Shipping from "./components/Shipping";

function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { state, state2, dispatch, dispatch2, state3, dispatch3 } = useContext(Store)

  const { cart: { cartItems } } = state
  const { wishlist: { wishlistItems } } = state2
  const { userInfo } = state3

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

  let handleRemoveItemWishlist = (item) => {
    dispatch2({
      type: 'WISHLIST_REMOVE_ITEM',
      payload: item
    })
  }

  let handleLogOut = () => {
    dispatch3({ type: 'USER_LOGOUT' })
    localStorage.removeItem('userInfo')
  }

  return (
    <div>
      <BrowserRouter>
        <Navbar bg="light" className="sticky-lg-top" variant="light">
          <ToastContainer position="bottom-center" limit={1} />
          <Container>
            <Navbar.Brand>
              <Link to='/'><img src="images/logo.png" height='50px' alt="" /></Link>
            </Navbar.Brand>
            <Nav className="ms-auto menu">
              <Link className="item" to="/">Home</Link>
              <Link className="item" to="products">products</Link>
              <Link className="item" to="compare">Compare product</Link>
              {/* Dopdown menu */}
              <NavDropdown title="Cart" id="nav-dropdown">
                {cartItems.length > 0 ?

                  <div>
                    <ListGroup>
                      {cartItems.map((item) => (
                        <ListGroup.Item className="mainDropdown">
                          <img className="ms-2 mt-2" width='50' src={item.img} alt="" />
                          <Link className="ms-2 mt-2" to={`/products/${item.slug}`} >{item.name}</Link>
                          <Button className="ms-2 mt-2" onClick={() => updateCart(item, item.quantity - 1)} disabled={item.quantity === 1} variant="success">-</Button>
                          <span className="p-2 mt-2"> {item.quantity} </span>
                          <Button className="ms-2 mt-2" onClick={() => updateCart(item, item.quantity + 1)} disabled={item.quantity === item.stoke} variant="success">+</Button>
                          <Button className="deleteBtn ms-2 mt-2" onClick={() => handleRemoveItem(item)} variant=""><FaTrash /> Delete</Button>
                        </ListGroup.Item>
                      ))}
                      <NavDropdown.Divider />
                      <Link to="/cartpage" className="w-100 text-center">
                        <Button variant="dark" className="w-100 gotoCartBtn">
                          Go to cart
                        </Button>
                      </Link>
                    </ListGroup>
                    <NavDropdown.Divider />
                  </div>
                  :
                  <div className="text-center returnToShoppingBtn">
                    <Card border="">
                      <Alert variant='danger'>
                        Cart Is Empty <FaShoppingCart />
                      </Alert>
                    </Card>
                  </div>
                }
              </NavDropdown>
              {state.cart.cartItems.length > 0 && (
                <Badge pill bg="success">
                  {state.cart.cartItems.length}
                </Badge>
              )}

              {/* ==================================================================================== */}

              <NavDropdown title="Wish List" id="nav-dropdown">
                {wishlistItems.length > 0 ?

                  <div>
                    <ListGroup>
                      {wishlistItems.map((item) => (
                        <ListGroup.Item className="mainDropdown">
                          <img className="ms-2 mt-2" width='50' src={item.img} alt="" />
                          <Link className="ms-2 mt-2" to={`/products/${item.slug}`} >{item.name}</Link>
                          <Button className="deleteBtn ms-2 mt-2" onClick={() => handleRemoveItemWishlist(item)} variant=""><FaTrash /> Delete</Button>
                        </ListGroup.Item>
                      ))}
                      <NavDropdown.Divider />
                      <Link to="/wishlist" className="w-100 text-center">
                        <Button variant="dark" className="w-100 gotoCartBtn">
                          Go to Wish List
                        </Button>
                      </Link>
                    </ListGroup>
                    <NavDropdown.Divider />
                  </div>
                  :
                  <div className="text-center returnToShoppingBtn">
                    <Card border="">
                      <Alert variant='danger'>
                        Wish List Is Empty <FaShoppingCart />
                      </Alert>
                    </Card>
                  </div>
                }
              </NavDropdown>
              {state2.wishlist.wishlistItems.length > 0 && (
                <Badge pill bg="success">
                  {state2.wishlist.wishlistItems.length}
                </Badge>
              )}
              {userInfo ?

                <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4" onClick={handleLogOut}>Log Out</NavDropdown.Item>
                </NavDropdown>

                :

                <Link className="item" to="/signin">Sign In</Link>
              }
              {/* =================================================================================================== */}
            </Nav>
          </Container>
        </Navbar>

        <Button variant="dark" onClick={handleShow} className="me-2 sideCart">
          <FaShoppingCart /> Cart
        </Button>
        <Offcanvas show={show} onHide={handleClose} placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Products</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {cartItems.map((item) => (
              <ListGroup.Item className="mainDropdown">
                <img className="ms-2 mt-2" width='50' src={item.img} alt="" />
                <Link className="ms-2 mt-2" to={`/products/${item.slug}`} >{item.name}</Link>
                <Button className="ms-2 mt-2" onClick={() => updateCart(item, item.quantity - 1)} disabled={item.quantity === 1} variant="success">-</Button>
                <span className="p-2 mt-2"> {item.quantity} </span>
                <Button className="ms-2 mt-2" onClick={() => updateCart(item, item.quantity + 1)} disabled={item.quantity === item.stoke} variant="success">+</Button>
                <Button className="deleteBtn ms-2 mt-2" onClick={() => handleRemoveItem(item)} variant=""><FaTrash /> Delete</Button>
              </ListGroup.Item>
            ))}

            <NavDropdown.Divider />
            <Link to="/cartpage" className="w-100 text-center">
              <Button variant="dark" className="w-100 gotoCartBtn">
                Go to cart
              </Button>
            </Link>
          </Offcanvas.Body>
        </Offcanvas>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<ProductDetails />} />
          <Route path="/cartpage" element={<CartPage />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/compare" element={<CompareProduct />} />
          <Route path="/shipping" element={<Shipping />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;


// #A21097
