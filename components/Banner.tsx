import React from "react";
import styles from "../styles/Banner.module.css";
import Router from "next/router";

export const Banner: React.FC = () => {
  return (
    <div>
      <img
        src="images/banner0.png"
        className={styles.banner}
        style={{ cursor: "pointer"}}
        onClick={() =>
          // redirects to asus laptop page on click
          Router.push({
            pathname: "./article",
            query: { reference: "asus-tuf" },
          })
        }
      />
    </div>
  );
};

export default Banner;
