import { Carousel } from "@mantine/carousel";
import {
  Card,
  Image,
  Overlay,
  Text,
  createStyles,
  getStylesRef,
  rem,
} from "@mantine/core";
import { Button } from "@nextui-org/react";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const useStyles = createStyles((theme) => ({
  price: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },

  carousel: {
    "&:hover": {
      [`& .${getStylesRef("carouselControls")}`]: {
        opacity: 1,
      },
    },
  },

  carouselControls: {
    ref: getStylesRef("carouselControls"),
    transition: "opacity 150ms ease",
    opacity: 0,
  },

  carouselIndicator: {
    width: rem(4),
    height: rem(4),
    transition: "width 250ms ease",

    "&[data-active]": {
      width: rem(16),
    },
  },
  control: {
    marginTop: `calc(${theme.spacing.xl} * 1.5)`,
    width: "fit-content",
    [theme.fn.smallerThan("sm")]: {
      width: "100%",
    },
  },
}));

const images = [
  // "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
  "https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80",
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
  "https://images.unsplash.com/photo-1564981797816-1043664bf78d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
];

export function BannerSlider() {
  const { classes } = useStyles();
  const autoplay = useRef(Autoplay({ delay: 2000 }));

  const slides = images.map((image) => (
    <Carousel.Slide key={image}>
      <div className="relative">
        <Image
          src={image}
          height={600}
          width="100%"
          alt="banner"
          radius="md"
          withPlaceholder
          placeholder={
            <Text align="center">This image contained the meaning of life</Text>
          }
        />
        <div className="absolute z-50 top-0 left-0 right-0 h-full flex flex-col justify-center w-[80%] px-[100px]">
          <h3 className="text-white text-[80px]">The Alumnus</h3>
          <p className="w-[70%]  text-white  text-[20px]">
            Build fully functional accessible web applications faster than ever
            – Mantine includes more than 120 customizable components and hooks
            to cover you in any situation
          </p>
          <Button
            radius="full"
            className=" primaryColor text-white shadow-lg w-fit my-4 px-6 py-1"
          >
            READ MORE
          </Button>
        </div>
        <Overlay
          gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
          opacity={1}
          zIndex={0}
        />
      </div>
    </Carousel.Slide>
  ));

  return (
    <Card radius="md" withBorder padding="xl">
      <Card.Section>
        <Carousel
          mx="auto"
          withIndicators
          height={600}
          plugins={[autoplay.current as any]}
          onMouseEnter={autoplay.current.stop}
          onMouseLeave={autoplay.current.reset}
          loop
          classNames={{
            root: classes.carousel,
            controls: classes.carouselControls,
            indicator: classes.carouselIndicator,
          }}
        >
          {slides}
        </Carousel>
      </Card.Section>
    </Card>
  );
}
