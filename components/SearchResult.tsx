import styles from "../styles/SearchResult.module.css";
import ProductCard from "../components/ProductCard";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { TailSpin } from "react-loader-spinner"; // spinner displayed when waiting for result

export const SearchResult: React.FC = () => {
  // what this function does:
  // 1st (on page load): fetches the backend, searches database with search input (router.query.parameter) (ex: search database for "laptop")
  // 2nd: sets the function "result()" according to backend search result: (either a spinner, "no results found", or productCards with article data)

  const router = useRouter();

  const [articles, setArticles] = useState([]);
  const [resultFound, setResultFound] = useState(undefined); // before search result comes, resultFound is undefined
  const [productCards, setProductCards] = useState(<></>); // before the search result comes, product card is empty

  // search function, that searches for article data in the database
  // called on page load
  const search = async () => {
    const res = await fetch(
      // searches for articles in database, using router.query.parameter (from the url)
      `${process.env.NEXT_PUBLIC_BACKEND_ADDRESS}articles/search/${router.query.parameter}/byPrice`
    );
    const response = await res.json(); // converts response to json format

    setResultFound(response.result); // if no results are found, setResultFound to false. If results are found, set it to true
    setArticles(response.searchResult); // if articles are found, setArticles to fetched data
  };

  // executes search function on page load
  useEffect(() => {
    // if (!router.query.parameter) return // wait for router.query.parameter (url parameter) before proceeding

    if (router.query.parameter) {
      setProductCards(<></>) // reset productCards every time user searches
      search(); // router.query.parameter (url parameter) has been obtained: proceed and execute database search
    }
    
  }, [router.query.parameter]);

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

  // NO RESULTS FOUND: returns a "no results found" message
  const noResultsMessage = (
    <p className={styles.noResults}>No results were found.</p>
  );

  // RESULTS WERE FOUND: results found and article data has been received from the backend: setProductCards with the data obtained from backend
  useEffect(() => {
    // @ts-ignore: property ArticleData does not exist on type  IntrinsicAttributes
    setProductCards(<ProductCard articleData={articles} />);
  }, [articles]);

  // result function, which returns one of these 3 possibilities
  const result = () => {
    if (resultFound === undefined)
    return spinner; // still waiting for data: return spinner
    else if (resultFound === false)
      return noResultsMessage; // no results found: return "no results found" message
    else if (resultFound === true) return productCards; // result found: return productCards
  };

  return <div>{result()}</div>;
};

export default SearchResult;
