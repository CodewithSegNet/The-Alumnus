import {
  Container,
  Image,
  Overlay,
  Text,
  Title,
  createStyles,
  rem,
} from "@mantine/core";
import FaqComponent from "./Faq";
import { GetInTouch } from "./TellUsMore";

const useStyles = createStyles((theme) => ({
  hero: {
    position: "relative",
    backgroundImage:
      "url(https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1949&q=80)",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  container: {
    height: rem(500),
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    paddingBottom: `calc(${theme.spacing.xl} * 6)`,
    zIndex: 1,
    position: "relative",

    [theme.fn.smallerThan("sm")]: {
      height: rem(500),
      paddingBottom: `calc(${theme.spacing.xl} * 3)`,
    },
  },

  title: {
    color: theme.white,
    fontSize: rem(60),
    fontWeight: 900,
    lineHeight: 1.1,

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(40),
      lineHeight: 1.2,
    },

    [theme.fn.smallerThan("xs")]: {
      fontSize: rem(28),
      lineHeight: 1.3,
    },
  },

  description: {
    color: theme.white,
    maxWidth: 600,

    [theme.fn.smallerThan("sm")]: {
      maxWidth: "100%",
      fontSize: theme.fontSizes.sm,
    },
  },

  control: {
    marginTop: `calc(${theme.spacing.xl} * 1.5)`,

    [theme.fn.smallerThan("sm")]: {
      width: "100%",
    },
  },
}));

export function AboutHeader() {
  const { classes } = useStyles();

  return (
    <section className="">
      {" "}
      <div className={classes.hero}>
        <Overlay
          gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
          opacity={1}
          zIndex={0}
        />
        <Container className={classes.container}>
          <Title className={classes.title}> About the Alumnus</Title>
          <Text className={classes.description} size="xl" mt="xl">
            This initiative aims to provide a robust platform that grants alumni
            access to a wide array of school-related activities and updates,
            thus enhancing their sense of belonging and involvement.
          </Text>
        </Container>
      </div>
      <section className="py-20 lg:px-[100px] px-[20px] ">
        <h2 className="text-4xl text-center">Our Mission</h2>
        <div className="lg:flex mt-20 gap-[50px]">
          <div className="lg:w-[40%] w-full">
            <Image
              radius={"md"}
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=50"
              alt="about"
              w="auto"
              fit="cover"
              height={400}
            />
          </div>
          <div className="lg:pr-10 lg:w-[60%] w-full mt-10">
            <h3 className="text-3xl lg:w-[90%] capitalize">refer an alumni</h3>
            <p className="py-2  w-[90%]">
              Our goal is to reach as many as 30,000 and counting Alumni all
              over the world. Yes, this is a conservative number of students who
              have marched through Lorem School and into great futures! Reach as
              many of your fellow old schoolmates.
            </p>
          </div>
        </div>
      </section>
      <section className="pb-20 mt-10 lg:px-[100px] px-[20px] ">
        <h2 className="text-4xl text-center">Frequently Asked Questions</h2>
        <div className="lg:flex lg:gap-[50px] items-center mt-10">
          <div className="lg:w-[50%] w-full">
            <FaqComponent />
          </div>
          <div className="lg:pr-10">
            <div className="lg:w-[80%] w-full">
              <Image
                radius={"md"}
                src="https://images.unsplash.com/photo-1614023342667-6f060e9d1e04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=50"
                alt="about"
                w="auto"
                fit="cover"
                height={400}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="pb-20 mt-10 lg:px-[100px] px-[20px] ">
        <h2 className="text-4xl text-center">Contact Us</h2>

        <section className="pb-20 ">
          <div className="lg:flex gap-[50px] items-center mt-10">
            <div className="lg:pr-10">
              <div className="w-full">
                <Image
                  radius={"md"}
                  src="https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=50"
                  alt="about"
                  w="auto"
                  fit="cover"
                  height={400}
                />
              </div>
            </div>
            <div className="lg:w-1/2">
              <GetInTouch />
            </div>
          </div>
        </section>
      </section>
    </section>
  );
}
