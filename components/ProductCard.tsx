import styles from "../styles/ProductCard.module.css";
import { useRouter } from "next/router";

// types expected for each articleData property
interface ArticleData {
  reference: string;
  img: Array<string>;
  brand: string;
  model: string;
  price: number;
}

export const ProductCard: React.FC = (props: any) => {
  const router = useRouter();
  const articleData: ArticleData = props.articleData;

  function toArticlePage(i: number) {
    router.push({
      pathname: "./article",
      // @ts-ignore: reference implicitly has any type because it does not have an interface
      query: { reference: articleData[i].reference },
    });
  }

  // @ts-ignore: .map does not exist on type ArticleData (it thinks .map is supposed to be a property, when it is actually method)
  const articleMap = articleData.map((article: ArticleData, i: number) => {
    // maps one article card per article
    return (
      <div className={styles.card} key={article?.reference}>
        <div className={styles?.cardInfo} onClick={() => toArticlePage(i)}>
          <img className={styles.image} src={article?.img[0]} />
          <p className={styles.brandAndModel}>{article?.brand} {article?.model}</p>
          <p className={styles.price}>{article?.price} €</p>
        </div>
      </div>
    );
  });

  return <div className={styles.container}>{articleMap}</div>;
}

export default ProductCard;
