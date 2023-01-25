import { useRouter } from "next/router";
import React from "react";
import styles from "../styles/Article.module.css";

// redux imports
import { useDispatch } from "react-redux";
import { addArticle } from "../reducers/cart";
import { addArticlePrice } from "../reducers/cartTotal";

// import AliceCarousel from "react-alice-carousel";
// import "react-alice-carousel/lib/alice-carousel.css";

// react responsive carousel imports
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { useEffect, useState } from "react";

// font awesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

// @mui imports
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export const Article: React.FC = () => {
  interface ArticleData {
    // types expected for each article property
    brand: string;
    model: string;
    price: number;
    description: string;
    img: Array<string>; // array of strings
  }

  // responsive breakpoints
  const theme = createTheme({
    breakpoints: {
      values: {
        // @ts-ignore: ignore no interface set for breakpoints (interface is not necessary here)
        mobile: 0,
        bigMobile: 350,
        tablet: 650,
        desktop: 1200,
      },
    },
  });

  const [article, setArticle] = useState<ArticleData>(Object);
  const [images, setImages] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();

  // function that fetches article data from database
  const search = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_ADDRESS}articles/${router.query.reference}`
    );
    const response = await res.json();

    // wait for result, then set article data
    if (!response.searchResult) {
      return;
    } else {
      // once response has been received, set article data
      setArticle(await response.searchResult);
    }

    // maps images (diplayed in the carousel) from db
    setImages(
      await response.searchResult.img.map((image: string) => {
        return (
          <div key={image} className={styles.imageContainer}>
            <img
              className={styles.image}
              src={image}
              role="presentation"
            />
          </div>
        );
      })
    );
  };

  // calls the search function on page load
  useEffect(() => {
    if (!router.query) return; // if router.query is undefined, wait

    search(); // once router.query is truthy, execute search
  }, [router.query]); // retry useEffect when router.query is updated

    // passes the article's data and dispatches the function from the reducer (add)
  const handleAddClick = (props: ArticleData) => {
    dispatch(addArticle(props)); // add item to cart
    dispatch(addArticlePrice(props)); // add item price to cart total
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          // height: 1200, // height of each image
          display: "grid",
          gridTemplateColumns: {
            mobile: "repeat(1, 1fr)", // 0 to 350px: 1 row will be displayed
            bigMobile: "repeat(1, 1fr)", // 350 to 650px: 1 row will be displayed
            tablet: "repeat(1, 1fr)", // 650 to 1200px: 1 row will be dsiplayed
            desktop: "repeat(2, 1fr)", // 1200px and above: 2 rows will be displayed
          },
        }}
      >
        <div className={styles.main}>
          {/* LEFT SECTION (image carousel) */}
          <div className={styles.left}>
            <Carousel
              showStatus={false} // hides "1 of 3" in the corner
              showThumbs={false} // hides thumbnails
              useKeyboardArrows={true} // enables user to use keyboard arrows
              // swipeable={true}
              // emulateTouch={true}
            >
              {images}
            </Carousel>
          </div>

          {/* RIGHT SECTION (description, article info) */}
          <div className={styles.right}>
            {/* contains top right (article info: brand, model, price and add to cart) */}
            <div className={styles.topRight}>
              {/* contains the brand the "add" button */}
              <div className={styles.container}>
                <p className={styles.brand}>
                  {article.brand} {article.model}
                </p>
              </div>
              {/* end of container */}

              {/* <p className={styles.model}>{article.model}</p> */}
              <p className={styles.price}>{article.price} €</p>

              <div className={styles.buttonAnimation}>
                <button
                  className={styles.button}
                  onClick={() => handleAddClick(article)}
                >
                  <FontAwesomeIcon
                    className={styles.cartIcon}
                    icon={faCartPlus}
                  />
                  Add
                </button>
              </div>
            </div>

            <div className={styles.descContainer}>
              <p className={styles.descText}>{article.description}</p>
            </div>
          </div>
        </div>
      </Box>
    </ThemeProvider>
  );
};

export default Article;
