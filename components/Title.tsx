import React from "react";
import styles from "../styles/Title.module.css";

interface Props {
  text: string;
}

export const Title: React.FC <Props> = (props) => {
  return (
        <div>
          <h1 className={styles.title}>{props.text}</h1>
        </div>
      );
}

export default Title;
