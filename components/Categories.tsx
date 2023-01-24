import React from "react";
import styles from "../styles/Thumbnails.module.css";
import { useRouter } from "next/router";

// @mui imports
import Box from "@mui/material/Box";
import ImageListItem, {
  imageListItemClasses,
} from "@mui/material/ImageListItem";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export const Thumbnails: React.FC = () => {
  const router = useRouter();

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

  const imagesData = [
    {
      src: "/images/categories/thumbnail4.jpg",
      title: "Business laptops",
      parameter: "business laptop",
    },
    {
      src: "/images/categories/thumbnail1.jpg",
      title: "Monitors",
      parameter: "monitor",
    },
    {
      src: "/images/categories/thumbnail2.jpg",
      title: "Gaming laptops",
      parameter: "gaming laptop",
    },
    {
      src: "/images/categories/thumbnail3.jpg",
      title: "Gaming accessories",
      parameter: "accessories",
    },
  ];

  // interface for the object used when clicking on category link
  // parameter must be a string
  interface propsInterface {
    parameter: string;
  }

  const toCategoryPage = (props: propsInterface) => {
    router.push({
      pathname: "./search",
      query: { parameter: props.parameter },
    });
  };

  return (
    <ThemeProvider theme={theme}>
      {/* what is inside of Box will be responsive, according to the breakpoints set above */}
      <Box
        sx={{
          height: 1200, // height of each image
          display: "grid",
          gridTemplateColumns: {
            mobile: "repeat(1, 1fr)", // 0 to 350px: 1 row will be displayed
            bigMobile: "repeat(1, 1fr)", // 350 to 650px: 1 row will be displayed
            tablet: "repeat(1, 1fr)", // 650 to 1200px: 1 row will be dsiplayed
            desktop: "repeat(2, 1fr)", // 1200px and above: 2 rows will be displayed
          },
          [`& .${imageListItemClasses.root}`]: {
            display: "flex",
            flexDirection: "column"
          }
        }}
      >

          {imagesData.map((image, i) => (
            <ImageListItem key={image.src}>
              <img
                src={`${image.src}?w=600&h=600&fit=crop&auto=format`}
                srcSet={`${image.src}?w=600&h=600&fit=crop&auto=format`}
                alt={image.title}
                loading="lazy"
              />
              <div
                className={styles.imageOverlay}
                onClick={() => toCategoryPage(image)}
              >
                <div className={styles.imageTitle}>{image.title}</div>
              </div>
            </ImageListItem>
          ))}
      </Box>
    </ThemeProvider>
  );
};

export default Thumbnails;
