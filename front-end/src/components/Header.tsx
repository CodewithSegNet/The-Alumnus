import {
  Burger,
  Container,
  Group,
  Header,
  createStyles,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import logo from "./../assets/Home/logo.png";
import { SideNavBar } from "./SideNavBar";

const useStyles = createStyles((theme) => ({
  inner: {
    height: rem(56),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  positionFixed: {
    position: "fixed",
    zIndex: 1000,
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: rem(5),
  },
}));

interface HeaderSearchProps {
  link: string;
  label: string;
}

const links: HeaderSearchProps[] = [
  {
    link: "/",
    label: "Home",
  },
  {
    link: "/about",
    label: "About Us",
  },
  {
    link: "/alumni",
    label: "Alumni",
  },
  {
    link: "/login",
    label: "login",
  },
  {
    link: "/signup",
    label: "Sign-Up",
  },
];
export function HeaderComponent() {
  const [opened, { toggle }] = useDisclosure(false);
  const { classes } = useStyles();
  const userId = Cookies.get("userId");

const items = links.map((link) => {
  // Check if the link label is not "login" or "Sign-Up" or if userId is null or undefined
  if (
    (link.label !== "login" && link.label !== "Sign-Up") ||
    userId === null ||
    userId === undefined
  ) {
    return (
      <Link
        className={`${classes.link} text-primary`}
        href={link.link}
        key={link.link}
      >
        {link.label}
      </Link>
    );
  } else {
    return null; // Return null for "login" and "Sign-Up" when userId is present
  }
});


  return (
    <>
      <Header className={classes.positionFixed} height={56} mb={120}>
        <Container>
          <div className={classes.inner}>
            {/* <MantineLogo size={28} /> */}
            <div className="">
              <Image alt="logo" src={logo} width={30} height={30} />
            </div>
            <Group
              spacing={5}
              className={`${classes.links} text-[16px] font-medium`}
            >
              {items}
            </Group>
            <Burger
              opened={opened}
              onClick={toggle}
              className={classes.burger}
              size="sm"
            />
          </div>
        </Container>
      </Header>
      {opened ? (
        <div>
          <div className="fixed top-12 left-0 h-screen bottom-0 z-50 bg-white">
            <SideNavBar />
          </div>
        </div>
      ) : null}
    </>
  );
}
