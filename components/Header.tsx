import React from "react";
import styles from "../styles/Header.module.css";
import { useRouter } from "next/router";
import { useState } from "react";

// popup imports
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import AboutPopupStyles from "../styles/AboutPopup.module.css"; // styling for the "About" popup

// fontawesome icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

// boostrap imports
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// redux imports
import { useDispatch } from "react-redux";
import { removeArticle } from "../reducers/cart";
import { removeArticlePrice, resetCartTotal } from "../reducers/cartTotal";
import { useSelector } from "react-redux";

export const Header: React.FC = () => {
  // +++++++++++++++ TYPESCRIPT INTERFACES +++++++++++++++
  interface Article {
    // types expected for each article property
    brand: string;
    model: string;
    price: number;
    description: string;
    img: Array<string>; // array of strings
  }

  interface State {
    cart: Cart;
    cartTotal: CartTotal;
  }

  interface Cart {
    // the cart's value is the array of objects (articles) that have been added to the cart
    value: Array<Object>;
  }

  interface CartTotal {
    // cartTotal's value is the subtotal (number) for the articles that have been added to the cart
    value: number;
  }

  const router = useRouter();
  const [inputText, setInputText] = useState("");

  // redux
  const dispatch = useDispatch();
  const cart = useSelector((state: State) => state.cart.value);
  const cartTotal = useSelector((state: State) => state.cartTotal.value);

  // converts input text to lower case
  const inputHandler = (e: object) => {
    // @ts-ignore: property does not exist on type object (due to no interface set for "e")
    const lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  // function called on clicking "search" or on pressing "enter": redirects to search page
  const handleSearch = () => {
    // if search field is empty (or only white space), do not proceed
    if (inputText.trim() === "") {
      alert("Search field is empty");
      return;
    }

    // if search field is filled, proceed to search page
    router.push({ pathname: "./search", query: { parameter: inputText } });
  };

  // executes search if user presses enter
  const handleKeyDown = (event: object) => {
    // @ts-ignore: property does not exist on type object (due to no interface set for "event")
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  // AboutPopup: webpage information, contact information, etc
  const AboutPopup = (close: Function) => {
    return (
      <div className={AboutPopupStyles.modal}>
        <button className={AboutPopupStyles.close} onClick={() => close()}>
          &times;
        </button>
        <div className={AboutPopupStyles.header}> About </div>
        <div className={AboutPopupStyles.content}>
          Nitori Computers is a fictional online computer store. The frontend
          was made with React / Typescript and Next JS, while the backend uses
          Express JS and Mongoose. The articles&apos; data is stored on a
          database (MongoDB).
          <br />
          <div className={AboutPopupStyles.checkOut}>
            contact: kevin.dutier@gmail.com
          </div>
          <div className={AboutPopupStyles.checkOut}>
            Check out the github repo for more information:
          </div>
          <br />
          <div className={AboutPopupStyles.links}>
            <a
              className={AboutPopupStyles.link}
              href="https://github.com/KevinDutier/nitori-computers-typescript"
              target="_blank"
              rel="noreferrer"
            >
              Nitori-computers repo
            </a>
          </div>
        </div>
      </div>
    );
  };

  // called when removing article from cart
  // passes the article's index and dispatches the function from the reducer (remove)
  function handleRemoveClick(props: object, index: number) {
    dispatch(removeArticle(index)); // remove article from cart
    dispatch(removeArticlePrice(props)); // remove article price from cart total

    // @ts-ignore: "expected one argument for resetCartTotal(" (resetCartTotal() does not need an argument, so we can ignore this error)
    if (cart.length === 1) dispatch(resetCartTotal()); // reset cart total to 0
  }

  // cartPopup: shows articles stored in the store (redux)
  const cartPopup = () => {
    // @ts-ignore: "argument of type (...) => JSX.Element" is not assignable to parameter
    const cartArticles = cart.map((article: Article, i: number) => {
      return (
        <div key={i} className={styles.popoverContainer}>
          <div className={styles.popover}>
            <div>
              {/* <p className={styles.brand}>{article.brand}</p> */}
              <p className={styles.model}>{article.model}</p>
            </div>
          </div>
          <div className={styles.priceAndX}>
            <p className={styles.price}>{article.price} €</p>
            <FontAwesomeIcon
              icon={faCircleXmark}
              className={styles.xIcon}
              onClick={() => handleRemoveClick(article, i)}
            />
          </div>
        </div>
      );
    });

    // if cart is empty, return "your cart is empty" message
    if (cartArticles.length === 0)
      return <p className={styles.emptyCart}>Your cart is empty</p>;
    // if cart is not empty, display cart articles
    else
      return (
        <div>
          {cartArticles}
          <div className={styles.bottom}>
            <p className={styles.emptyCart}>Total: {cartTotal} €</p>
            <Button className={styles.button}>Order</Button>
          </div>
        </div>
      );
  };

  return (
    <div className={styles.main}>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          {/* contains the whole navbar */}
          <Navbar.Brand href="./">
            {/* contains logo and name*/}
            <img
              alt=""
              src="https://i.imgur.com/B4845Fd.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            Nitori Computers
          </Navbar.Brand>
          {/* ++++++++++++++++ LEFT SECTION ++++++++++++++++ */}
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {/* categories */}
              <NavDropdown title="Categories" id="collasible-nav-dropdown">
                <NavDropdown.Item href="./search?parameter=laptop">
                  All laptops
                </NavDropdown.Item>
                <NavDropdown.Item href="./search?parameter=business+laptop">
                  Business laptops
                </NavDropdown.Item>
                <NavDropdown.Item href="./search?parameter=gaming+laptop">
                  Gaming laptops
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="./search?parameter=accessories">
                  Accessories
                </NavDropdown.Item>
                <NavDropdown.Item href="./search?parameter=monitor">
                  Monitors
                </NavDropdown.Item>
              </NavDropdown>

              {/* brands */}
              <NavDropdown title="Brands" id="collasible-nav-dropdown">
                <NavDropdown.Item href="./search?parameter=acer">
                  Acer
                </NavDropdown.Item>
                <NavDropdown.Item href="./search?parameter=alienware">
                  Alienware
                </NavDropdown.Item>
                <NavDropdown.Item href="./search?parameter=asus">
                  Asus
                </NavDropdown.Item>
                <NavDropdown.Item href="#./search?parameter=dell">
                  Dell
                </NavDropdown.Item>
                <NavDropdown.Item href="./search?parameter=hp">
                  HP
                </NavDropdown.Item>
                <NavDropdown.Item href="./search?parameter=lenovo">
                  Lenovo
                </NavDropdown.Item>
                <NavDropdown.Item href="./search?parameter=logitech">
                  Logitech
                </NavDropdown.Item>
                <NavDropdown.Item href="./search?parameter=samsung">
                  Samsung
                </NavDropdown.Item>
              </NavDropdown>

              {/* about link */}
              <Popup
                trigger={<Nav.Link>About</Nav.Link>}
                position="right center"
                modal
              >
                {
                  // @ts-ignore: (close: Function) => JSX.Element is not assignable to type ReactNode
                  AboutPopup
                }
              </Popup>
            </Nav>

            {/* ++++++++++++++++ RIGHT SECTION ++++++++++++++++ */}
            <Nav>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={inputHandler}
                onKeyDown={(e) => handleKeyDown(e)}
              />
              <Button variant="outline-success" onClick={() => handleSearch()}>
                Search
              </Button>
              <Popup
                trigger={<Nav.Link>Cart</Nav.Link>}
                position="bottom center"
                nested
              >
                {
                  // @ts-ignore: () => JSX.Element is not assignable to type ReactNode
                  cartPopup
                }
              </Popup>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
