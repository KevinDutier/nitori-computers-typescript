import Header from "../components/Header";
import Slideshow from "../components/Slideshow";
import Title from "../components/Title";
import Categories from "../components/Categories";
import Banner from "../components/Banner";

function Index() {
  return (
    <>
      <Header />
      <Slideshow />
      <Banner />
      <Title text="Browse our categories" />
      <Categories />
    </>
  );
}

export default Index;
