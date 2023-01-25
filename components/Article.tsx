import { useRouter } from "next/router";
import React from "react";
import styles from "../styles/Article.module.css";
import { useEffect, useState } from "react";

import { TailSpin } from "react-loader-spinner"; // spinner displayed when waiting for result

// redux imports
import { useDispatch } from "react-redux";
import { addArticle } from "../reducers/cart";
import { addArticlePrice } from "../reducers/cartTotal";

// react responsive carousel imports
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// font awesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

export const Article: React.FC = () => {
  interface ArticleData {
    // types expected for each article property
    brand: string;
    model: string;
    price: number;
    description: string;
    img: Array<string>; // array of strings
  }

  const [resultFound, setResultFound] = useState(undefined); // before search result comes, resultFound is undefined
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
      setResultFound(response.result); // if no results are found, setResultFound to false. If results are found, set it to true
      // once response has been received, set article data
      setArticle(await response.searchResult);
    }

    // maps images (diplayed in the carousel) from db
    setImages(
      await response.searchResult.img.map((image: string) => {
        return (
          <div key={image} className={styles.imageContainer}>
            <img className={styles.image} src={image} role="presentation" />
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
  };

  // ++++++++++++++++++ CODE THAT RETURNS ONE OF 3 POSSIBILITIES ++++++++++++++++++
  // 3 possibilities: still waiting for result, result found, or no results found

  // STILL WAITING FOR RESULT: returns a spinner
  const spinner = (
    <div className={styles.spinner}>
      {/* centers the spinner */}
      <TailSpin
        height="120"
        color="black"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );

  // ARTICLE NOT FOUND: returns a "not found" message
  const noResultsMessage = <p className={styles.noResults}>Not found.</p>;

  // ARTICLE FOUND: returns all the article's data
  const articleFound = (
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
              <FontAwesomeIcon className={styles.cartIcon} icon={faCartPlus} />
              Add
            </button>
          </div>
        </div>

        <div className={styles.descContainer}>
          <p className={styles.descText}>{article.description}</p>
        </div>
      </div>
    </div>
  );

  // function that returns one of these 3 possibilities
  const result = () => {
    if (resultFound === undefined) return spinner;  // still waiting for data: return spinner
    if (resultFound === false) return noResultsMessage; // no results found: return "not found" message
    if (resultFound === true) return articleFound; // result found: return articleFound
  };

  // main function return
  return <>{result()}</>;
};

export default Article;
