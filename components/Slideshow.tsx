import React from "react";
import styles from "../styles/Slideshow.module.css";
import Router from "next/router";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export const Slideshow: React.FC = () => {
  const clickBanner = (index: number) => {
    // redirects when clicking on an image
    if (index === 0) Router.push({ pathname: "./article", query: {reference: "lenovo-thinkpad-x1"}}) // 1st image, redirects to thinkpad x1
    if (index === 1) Router.push({ pathname: "./search", query: {parameter: "lenovo"}}) // 2nd image, redirects to lenovo
    if (index === 2) Router.push({ pathname: "./search", query: {parameter: "samsung"}}) // 3rd image, redirects to samsung
  }

  return (
        <div>
          <main className={styles.main}>
            <Carousel
              className={styles.carousel}
              autoPlay={true} // enables autoplay
              interval={4000} // how long before showing next slide
              transitionTime={700} // how long is the animation
              infiniteLoop={true} // loops back to first image after reaching the last one
              showStatus={false} // hides "1 of 3" in the corner
              showThumbs={false} // hides thumbnails
              swipeable={true} // allows user to drag images with the mouse (default: true)
              emulateTouch={true} // enables swipe on non-touch screens
              stopOnHover={false} // stops slideshow on hover
              useKeyboardArrows={true} // enables user to use keyboard arrows
              onClickItem={(index) => clickBanner(index)}
            >
              <div>
                <img src="images/slideshow/slideshow0.jpg" />
              </div>
              <div>
                <img src="images/slideshow/slideshow1.jpg" />
              </div>
              <div>
                <img src="images/slideshow/slideshow2.jpg" />
              </div>
            </Carousel>
          </main>
        </div>
      );
}

export default Slideshow;
