import {
  Burger,
  Container,
  Group,
  Header,
  Menu,
  createStyles,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import logo from "./../assets/Home/logo.png";

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
    link: "/about",
    label: "Home",
  },
  {
    link: "/about",
    label: "About Us",
  },
  {
    link: "/pricing",
    label: "Forum",
  },
  {
    link: "/pricing",
    label: "Blog",
  },
];
export function HeaderComponent() {
  const [opened, { toggle }] = useDisclosure(false);
  const { classes } = useStyles();

  const items = links.map((link) => {
    const menuItems = links?.map((item) => (
      <Menu.Item key={item.link}>{item.label}</Menu.Item>
    ));

    return (
      <a
        key={link.label}
        href={link.link}
        className={`${classes.link} text-primary`}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </a>
    );
  });

  return (
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
  );
}
